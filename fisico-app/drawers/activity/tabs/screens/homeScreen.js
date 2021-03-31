import React, { useEffect, useState } from 'react';
import { useContext } from 'react';

import { ScrollView, View, StyleSheet, Text , Button} from 'react-native';
import { LightModeColors, DarkModeColors } from '../../../../styles/colors';
import Workout from '../../workout';
import  ThemeContext  from '../../../../contexts/themeContext';
import  AppDataContext  from '../../../../contexts/appDataContext';
import { FISICO_API_URL, FISICO_URL } from '../../../../utils/urls';
import { FetchWorkoutArray, SaveWorkout } from '../../../../utils/workoutStorage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Provider, Portal } from 'react-native-paper';
import WorkoutDetails from '../../workoutDetails';

const HomeScreen = ( {navigation}) => {
  const themeContext = useContext(ThemeContext);
  const appDataContext = useContext(AppDataContext);

  const [workouts, setWorkouts] = useState([]);
  const [timesRan, setTimesRan] = useState(0);

  useEffect(() => {
    //clearAsyncStorage();
    prepareWorkouts();
  }, [appDataContext.trigger]);

  const prepareWorkouts = async () => {
    console.log('Times Ran: ' + timesRan);
    setTimesRan(timesRan + 1);
    try {
      const workout_arr = await FetchWorkoutArray();
      setWorkouts(workout_arr);
    } catch (error) {
      console.error(error);
    } 
  };

  const clearAsyncStorage = async () => {
    await AsyncStorage.clear();
    console.log('Storage Cleared');
  }


  // Modal
  const [shownModal, setShownModal] = React.useState(-1);

  return (

    <ScrollView
      style={styling(themeContext).container}
      >
      <Button onPress={() => navigation.navigate('LogWorkoutScreen')} title='New'></Button>
        {workouts.map((workoutObject, workoutIndex) => (
        <View key={workoutIndex}>
          <Workout info={workoutObject} onPress={() => setShownModal(workoutIndex)}/>
        </View>
      ))}
    </ScrollView>


  )
}

function styling(themeContext) {
  const style = StyleSheet.create({
    container: {
      flex: 1,
      padding: 15,
      backgroundColor: themeContext.darkMode ? DarkModeColors.MenuBackground : LightModeColors.Content,
    },
  })

  return style;
}


export default HomeScreen;