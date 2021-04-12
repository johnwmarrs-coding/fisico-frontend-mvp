import React from 'react';
import { useContext, useState } from 'react';
import { Text, View, ScrollView, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { LightModeColors, DarkModeColors } from '../../../../styles/colors';
import { Button, ToggleButton } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import  AppDataContext  from '../../../../contexts/appDataContext';
import { AnalyticsTypes } from '../../../../utils/workoutTypes';
import { FISICO_API_URL, FISICO_URL } from '../../../../utils/urls';

const AnalyticsScreen = () => {
  const appDataContext = useContext(AppDataContext);

  const timeOptions = ['1 Week', '1 Month', '3 Months', '6 Months', '1 Year'];
  const [analyticsType, setAnalyticsType] = useState(AnalyticsTypes[0]);
  const [timeSpan, setTimeSpan] = useState('7 Days')
  const [requestFailed, setRequestFailed] = useState(false);
  const [data, setData] = useState(null);

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
          'days': num_days,
        })
      });
      let json = await response.json();
      if (json.success) {
        console.log('SUCCESS');
        console.log('MESSAGE: ' + json.msg);
        console.log(JSON.stringify(json));
        console.log(json.data);
        setData(json.data);
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
    <ScrollView style={styles.container}>
      <Text>Analytics</Text>
      <Picker 
        selectedValue={analyticsType}
        onValueChange={(itemValue, itemIndex) => setAnalyticsType(itemValue)}
      >
        {AnalyticsTypes.map((item, key) => (
          <Picker.Item key={key} label={item} value={item}/>
            )
        )}
      </Picker>

      <Picker 
        selectedValue={timeSpan}
        onValueChange={(itemValue, itemIndex) => setTimeSpan(itemValue)}
      >
        {timeOptions.map((item, key) => (
          <Picker.Item key={key} label={item} value={item}/>
            )
        )}
      </Picker>

      <Button mode='contained' style={styles.button} onPress={sendAnalyticsRequest}>Go</Button>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: LightModeColors.Content,
  },
  button: {
    marginTop: 5,
    marginBottom: 5,
    width: 120,
  },
})

export default AnalyticsScreen;