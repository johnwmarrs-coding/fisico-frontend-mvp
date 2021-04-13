import React from 'react';
import { useContext, useState } from 'react';
import { Dimensions } from 'react-native';
import { Text, View, ScrollView, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { LightModeColors, DarkModeColors } from '../../../../styles/colors';
import { Button, ToggleButton } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import  AppDataContext  from '../../../../contexts/appDataContext';
import { AnalyticsTypes, DistanceUnits, WeightUnits } from '../../../../utils/workoutTypes';
import { FISICO_API_URL, FISICO_URL } from '../../../../utils/urls';
import { Chart, Line, Area, HorizontalAxis, VerticalAxis } from 'react-native-responsive-linechart'

const AnalyticsScreen = () => {
  const appDataContext = useContext(AppDataContext);

  const timeOptions = ['1 Week', '1 Month', '3 Months', '6 Months', '1 Year'];
  const [analyticsType, setAnalyticsType] = useState(AnalyticsTypes[0]);
  const [timeSpan, setTimeSpan] = useState('1 Week');
  const [displayUnit, setDisplayUnit] = useState('km');
  const [isDistance, setIsDistance] = useState(true);
  const [requestFailed, setRequestFailed] = useState(false);
  const [data, setData] = useState(null);
  const [numDays, setNumDays] = useState(7);
  const [chartData, setChartData] = useState(null);

  const GetFormattedDate = (d) => {
    var todayTime = d;
    var month = (todayTime.getMonth() + 1);
    var day = (todayTime.getDate());
    var year = (todayTime.getFullYear());
    return month + "/" + day + "/" + year;
  }

  //data.datalist.distance
  const generate_distance_dataset = (data_arr) => {
    var dataset = [];
    var domainMin = 0;
    var domainMax = 10;
    var rangeMin = 0;
    var rangeMax = 10;
    
    for (var i = 0; i < data_arr.length; i++) {
      dataset.push({x: new Date(data_arr[i].date).getTime(), y: data_arr[i].current_total_distance});
      console.log({x: new Date(data_arr[i].date).getTime(), y: data_arr[i].current_total_distance});
      if (data_arr[i].current_total_distance > rangeMax) {
        rangeMax = data_arr[i].current_total_distance
      }
    }

    if (dataset.length > 0 ){
      domainMin = dataset[0].x;
      domainMax = dataset[dataset.length - 1].x;
    }

    if (displayUnit == 'mi') {
      dataset = dataset.map(row => {var container = {}; container.x = row.x; container.y = row.y * 0.621371; return container});
      rangeMax = rangeMax * 0.621371;
    }else if (displayUnit == 'm'){
      dataset = dataset.map(row => {var container = {}; container.x = row.x; container.y = row.y * 1000.0; return container});
      rangeMax = rangeMax * 1000.0;
    }
    return {data: dataset, domainMin: domainMin, domainMax: domainMax, rangeMin: rangeMin, rangeMax: rangeMax};
  }

  const generate_individual_distance_dataset = (data_arr) => {
    var dataset = [];
    var domainMin = 0;
    var domainMax = 10;
    var rangeMin = 0;
    var rangeMax = 10;
    
    for (var i = 0; i < data_arr.length; i++) {
      dataset.push({x: new Date(data_arr[i].date).getTime(), y: data_arr[i].distance});
      console.log({x: new Date(data_arr[i].date).getTime(), y: data_arr[i].distance});
      if (data_arr[i].distance > rangeMax) {
        rangeMax = data_arr[i].distance
      }
    }
    if (dataset.length > 0 ){
      domainMin = dataset[0].x;
      domainMax = dataset[dataset.length - 1].x;
    }

    if (displayUnit == 'mi') {
      dataset = dataset.map(row => {var container = {}; container.x = row.x; container.y = row.y * 0.621371; return container});
      rangeMax = rangeMax * 0.621371;
    }else if (displayUnit == 'm'){
      dataset = dataset.map(row => {var container = {}; container.x = row.x; container.y = row.y * 1000.0; return container});
      rangeMax = rangeMax * 1000.0;
    }
    return {data: dataset, domainMin: domainMin, domainMax: domainMax, rangeMin: rangeMin, rangeMax: rangeMax};
  }

  const generate_weight_dataset = (data_arr) => {
    var dataset = [];
    var domainMin = 0;
    var domainMax = 10;
    var rangeMin = 0;
    var rangeMax = 10;
    
    for (var i = 0; i < data_arr.length; i++) {
      dataset.push({x: new Date(data_arr[i].date).getTime(), y: data_arr[i].current_total_weight});
      console.log({x: new Date(data_arr[i].date).getTime(), y: data_arr[i].current_total_weight});
      if (data_arr[i].current_total_weight > rangeMax) {
        rangeMax = data_arr[i].weight
      }
    }
    if (dataset.length > 0 ){
      domainMin = dataset[0].x;
      domainMax = dataset[dataset.length - 1].x;
    }

    if (displayUnit == 'lbs') {
      dataset = dataset.map(row => {var container = {}; container.x = row.x; container.y = row.y * 2.20462; return container});
      rangeMax = rangeMax * 2.20462;
    }
    return {data: dataset, domainMin: domainMin, domainMax: domainMax, rangeMin: rangeMin, rangeMax: rangeMax};
  }


  const sendAnalyticsRequest = async () => {
    let num_days = 0;
    let route = '';
    switch(timeSpan) {
      case '1 Week':
        num_days = 7;
        break;
      case '1 Month':
        num_days = 30;
        break;
      case '3 Months':
        num_days = 90;
        break;
      case '6 Months':
        num_days = 180;
        break;
      case '1 Year':
        num_days = 365;
        break;
      default:
        num_days = 30;
        break;
    }
    setNumDays(num_days);
    console.log('Num Days: ' + num_days);

    switch (analyticsType){
      case 'Total Distance':
        route = '/workout/analytics/distance'
        break;
      case 'Distance Per Workout':
        route = '/workout/analytics/distance'
        break;
      case 'Total Weight':
        route = '/workout/analytics/lifts'
        break;
      default:
        route = '/workout/analytics/distance'
        break;
    }
    console.log('Sending to ' + FISICO_URL + route);
    try {
      let response = await fetch(FISICO_URL + route, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          'user_id': appDataContext.userID,
          'days': ('' + num_days),
        })
      });
      let json = await response.json();
      if (json.success) {
        console.log('SUCCESS');
        console.log('MESSAGE: ' + json.msg);
        console.log(JSON.stringify(json));
        console.log(json.data);
        setData(json.data);
        if (analyticsType == 'Total Distance') {
          setChartData(generate_distance_dataset(json.data.data_list));
        } else if (analyticsType == 'Distance Per Workout'){
          setChartData(generate_individual_distance_dataset(json.data.data_list));
        } else if (analyticsType == 'Total Weight') {
          setChartData(generate_weight_dataset(json.data.data_list));
        }
      }else {
        console.log("FAILURE");
        console.log(JSON.stringify(json));
        setRequestFailed(true);
      }
      
    } catch (error) {
      console.error(error);
      setRequestFailed(true);
    }
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={{alignItems: 'flex-start'}}>
      <Text style={styles.label}>Analytics Type</Text>
      <Picker 
        selectedValue={analyticsType}
        onValueChange={(itemValue, itemIndex) => { setAnalyticsType(itemValue); itemValue == 'Total Distance' || itemValue == 'Distance Per Workout' ? setIsDistance(true) : setIsDistance(false)}}
        style={{width: '100%'}}
      >
        {AnalyticsTypes.map((item, key) => (
          <Picker.Item key={key} label={item} value={item}/>
            )
        )}
      </Picker>
      <Text style={styles.label}>Time Span</Text>
      <Picker 
        selectedValue={timeSpan}
        onValueChange={(itemValue, itemIndex) => setTimeSpan(itemValue)}
        style={{width: '100%'}}
      >
        {timeOptions.map((item, key) => (
          <Picker.Item key={key} label={item} value={item}/>
            )
        )}
      </Picker>

      <Text style={styles.label}>Units</Text>
      <Picker 
        selectedValue={displayUnit}
        onValueChange={(itemValue, itemIndex) => setDisplayUnit(itemValue)}
        style={{width: '100%'}}
      >
        {isDistance == true ? (DistanceUnits.map((item, key) => (<Picker.Item key={key} label={item} value={item}/>)))
        : WeightUnits.map((item, key) => (<Picker.Item key={key} label={item} value={item}/>)
        )}
      </Picker>

      <Button mode='contained' style={styles.button} onPress={sendAnalyticsRequest}>Go</Button>

      { chartData != null && data != null && chartData.data.length > 1 && (analyticsType == 'Total Distance' || analyticsType == 'Distance Per Workout')?
      <Chart
        style={{ height: 200, width: '100%' }}
        data={chartData.data}
        padding={{ left: 40, bottom: 20, right: 20, top: 20 }}
        xDomain={{ min: chartData.domainMin, max: chartData.domainMax }}
        yDomain={{ min: chartData.rangeMin, max: chartData.rangeMax }}
      >
        <VerticalAxis tickCount={8} theme={{ labels: { formatter: (v) => v.toFixed(1) } }} />
        <HorizontalAxis tickCount={5} theme={{labels: { formatter: (v) => GetFormattedDate(new Date(v))}}}/>
        <Area theme={{ gradient: { from: { color: '#ffa502' }, to: { color: '#ffa502', opacity: 0.4 } }}} />
        <Line theme={{ stroke: { color: '#ffa502', width: 5 }, scatter: { default: { width: 4, height: 4, rx: 2 }} }} />
      </Chart>
      :
      null
      }

      { chartData != null && data != null && chartData.data.length > 1 && analyticsType == 'Total Weight' ?
      <Chart
        style={{ height: 200, width: '100%' }}
        data={chartData.data}
        padding={{ left: 40, bottom: 20, right: 20, top: 20 }}
        xDomain={{ min: chartData.domainMin, max: chartData.domainMax }}
        yDomain={{ min: chartData.rangeMin, max: chartData.rangeMax }}
      >
        <VerticalAxis tickCount={8} theme={{ labels: { formatter: (v) => v.toFixed(1) } }} />
        <HorizontalAxis tickCount={5} theme={{labels: { formatter: (v) => GetFormattedDate(new Date(v))}}}/>
        <Area theme={{ gradient: { from: { color: '#ffa502' }, to: { color: '#ffa502', opacity: 0.4 } }}} />
        <Line theme={{ stroke: { color: '#ffa502', width: 5 }, scatter: { default: { width: 4, height: 4, rx: 2 }} }} />
      </Chart>
      :
      null
      }
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: LightModeColors.Content,
  },
  label: {
    color: LightModeColors.ContentForeground,
    fontSize: 20,
    fontWeight: "bold",
    textAlign: 'center',
    marginTop: 5,
    marginBottom: 5,
  },
  paragraph: {
    color: LightModeColors.ContentForeground,
    fontSize: 14,
    textAlign: 'center',
    marginTop: 5,
    marginBottom: 5,
  },
  field: {
    padding: 5,
    height:40,
    marginBottom: 5,
    marginTop: 5,
    backgroundColor: LightModeColors.FieldBackground,
    color: LightModeColors.FieldForeground,
  },
  warning: {
    color: LightModeColors.Warning,
    fontSize: 14,
    textAlign: 'center'
  },
  button: {
    marginTop: 5,
    marginBottom: 5,
    width: 120,
    alignSelf: 'center'
  },
  buttonLabel: {
      color: DarkModeColors.ContentForeground,
  },
  row: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      margin: 5,
      padding: 5,
      paddingBottom: 20,
  }
})

export default AnalyticsScreen;