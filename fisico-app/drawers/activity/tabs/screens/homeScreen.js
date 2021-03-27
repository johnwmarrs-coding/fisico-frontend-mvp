import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { ScrollView, View, StyleSheet, Text , Button} from 'react-native';
import { LightModeColors, DarkModeColors } from '../../../../styles/colors';
import Workout from '../../workout';
import ThemeContext from '../../../../contexts/themeContext';
import { FISICO_API_URL, FISICO_URL } from '../../../../utils/urls'

const HomeScreen = ( {navigation}) => {
  const themeContext = useContext(ThemeContext);
  const [workouts, setWorkouts] = useState([]);
  useEffect(() => {
    fetch(FISICO_URL + '/workout/604ec6262586462a620c3a92')
    .then((response) => response.json())
    .then((json) => {  
      return setWorkouts(json.workout);
    })
    .catch((error) => {
      console.error(error);
    });
  }, [])

  return (
    <View>
      <ScrollView style={themeContext.darkMode ? stylesDark.container : styles.container}>
        {workouts.map((workoutObject, index) => (
          <Workout key={index} info={workoutObject}/>
        ))}
      </ScrollView>
      <Button onPress={() => navigation.navigate('LogWorkoutScreen')} title='New'></Button>
    </View>
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