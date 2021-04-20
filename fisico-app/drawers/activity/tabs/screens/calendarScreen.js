import React, { useEffect, useState } from 'react';
import { useContext } from 'react';

import { ScrollView, View, StyleSheet, Text , Button} from 'react-native';
import { LightModeColors, DarkModeColors } from '../../../../styles/colors';
import Workout from '../../workout';
import  AppDataContext  from '../../../../contexts/appDataContext';
import { FISICO_API_URL, FISICO_URL } from '../../../../utils/urls';
import { FetchWorkoutArray, SaveWorkout } from '../../../../utils/workoutStorage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Provider, Portal } from 'react-native-paper';
import WorkoutDetails from '../../workoutDetails';

const CalendarScreen = ( {navigation}) => {
  const appDataContext = useContext(AppDataContext);

  const [workouts, setWorkouts] = useState([]);
  const [timesRan, setTimesRan] = useState(0);

  useEffect(() => {
    //clearAsyncStorage();
    sendWorkoutsRequest();
  }, [appDataContext.trigger]);

  const sendWorkoutsRequest = async () => {
    try {
      let response = await fetch(FISICO_URL + '/workout/get', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          'user_id': appDataContext.userID,
          'past': false,
          'days': 7,
        })
      });
      let json = await response.json();
      if (json.success) {
        console.log('SUCCESS');
        console.log('MESSAGE: ' + json.msg);
        console.log(JSON.stringify(json));
        setWorkouts(json.workout);
      }else {
        console.log("FAILURE");
        console.log(JSON.stringify(json));
        setLoginFailed(true);
      }
      
    } catch (error) {
      console.error(error);
      setLoginFailed(true);
    }
  };

  // Modal
  const [shownModal, setShownModal] = React.useState(-1);

  return (

    <ScrollView
      style={styles.container}
      >
      <Button color={LightModeColors.MenuBackground} onPress={() => navigation.navigate('PlanWorkoutScreen')} title='Plan Workout'></Button>
        {workouts.map((workoutObject, workoutIndex) => {
          if (workoutObject.completed == false) {
            return (
              <View key={workoutIndex}>
                <Workout info={workoutObject} onPress={() => setShownModal(workoutIndex)}/>
              </View>
            )
          }else {
            return null;
          }
      })}
    </ScrollView>


  )
}

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 15,
      backgroundColor: LightModeColors.Content,
    },
  })


export default CalendarScreen;