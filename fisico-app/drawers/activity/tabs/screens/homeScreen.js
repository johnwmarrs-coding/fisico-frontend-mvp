import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import { LightModeColors, DarkModeColors } from '../../../../styles/colors';
import Workout from '../../workout';
import ThemeContext from '../../../../contexts/themeContext';
import { Provider, Portal } from 'react-native-paper';
import WorkoutDetails from '../../workoutDetails';

const HomeScreen = () => {
  const themeContext = useContext(ThemeContext);
  const [workouts, setWorkouts] = useState([]);
  useEffect(() => {
    fetch('http://192.168.1.125:3000/workout/604ec6262586462a620c3a92')
    .then((response) => response.json())
    .then((json) => {  
      return setWorkouts(json.workout);
    })
    .catch((error) => {
      console.error(error);
    });
  }, [])

  // Modal
  const [shownModal, setShownModal] = React.useState(-1);

  return (
    <Provider>
      <ScrollView
      style={styling(themeContext).container}
      >
        {workouts.map((workoutObject, workoutIndex) => (
          <View key={workoutIndex}>
            <Workout info={workoutObject} onPress={() => setShownModal(workoutIndex)}/>
            <Portal>
              <WorkoutDetails
                shownModal={shownModal}
                workoutIndex={workoutIndex}
                workoutObject={workoutObject}
                setShownModal={setShownModal}
              />
            </Portal>
          </View>
        ))}
      </ScrollView>
    </Provider>
  )
}

function styling(themeContext) {
  const style = StyleSheet.create({
    container: {
      flex: 1,
      padding: 15,
      backgroundColor: themeContext.darkMode ? DarkModeColors.MenuBackground : LightModeColors.MenuBackground,
    },
  })

  return style;
}

export default HomeScreen;