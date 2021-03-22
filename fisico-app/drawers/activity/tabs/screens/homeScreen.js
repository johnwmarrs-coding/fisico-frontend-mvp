import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { ScrollView, View, StyleSheet, Text } from 'react-native';
import { LightModeColors, DarkModeColors } from '../../../../styles/colors';
import Workout from '../../workout';
import ThemeContext from '../../../../contexts/themeContext';

const HomeScreen = () => {
  const themeContext = useContext(ThemeContext);
  const [workouts, setWorkouts] = useState([]);
  useEffect(() => {
    fetch('http://localhost:3000/workout/604ec6262586462a620c3a92')
    .then((response) => response.json())
    .then((json) => {
      console.log("hello");      
      return setWorkouts(json.workout);
    })
    .catch((error) => {
      console.error(error);
    });
  }, [])

  return (
    <ScrollView style={themeContext.darkMode ? stylesDark.container : styles.container}>
      {/*
      { workouts }   
      */}
      {workouts.map((workoutObject, index) => (
        <Text key={index}>{ JSON.stringify(workoutObject) }</Text>
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