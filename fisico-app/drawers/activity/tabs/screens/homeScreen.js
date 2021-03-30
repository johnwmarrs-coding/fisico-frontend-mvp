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


  return (
    /*
    {workouts.map((workoutObject, index) => (
          <Text key={index}>{workoutObject.name}</Text>
        ))}
    */
   
    <ScrollView style={themeContext.darkMode ? stylesDark.container : styles.container}>
        <Button onPress={() => navigation.navigate('LogWorkoutScreen')} title='New'></Button>
        {workouts.map((workoutObject, index) => (
          <Workout key={index} info={workoutObject}/>
        ))}
    </ScrollView>
  )
}

const stylesDark = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: DarkModeColors.MenuBackground
  },
  label: {
    color: DarkModeColors.ContentForeground,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold"
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: LightModeColors.ContentBackground
  },
  label: {
    color: LightModeColors.ContentForeground,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold"
  }
});


export default HomeScreen;