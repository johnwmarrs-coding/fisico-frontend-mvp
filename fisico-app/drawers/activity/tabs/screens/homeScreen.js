import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { ScrollView, View, StyleSheet, Text, TouchableHighlight, Button } from 'react-native';
import { LightModeColors, DarkModeColors } from '../../../../styles/colors';
import Workout from '../../workout';
import ThemeContext from '../../../../contexts/themeContext';
import { Provider, Portal, Modal } from 'react-native-paper';

const HomeScreen = () => {
  const themeContext = useContext(ThemeContext);
  const [workouts, setWorkouts] = useState([]);
  useEffect(() => {
    fetch('http://localhost:3000/workout/604ec6262586462a620c3a92')
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
      style={themeContext.darkMode ? stylesDark.container : styles.container}
      >
        {workouts.map((workoutObject, workoutIndex) => (
          <View key={workoutIndex}>
            <Workout info={workoutObject} onPress={() => setShownModal(workoutIndex)}/>
            <Portal>
              <Modal
                animationType="slide"
                visible={shownModal == workoutIndex}  // this is really janky but works
                onDismiss={() => setShownModal(-1)}
                onRequestClose={() => setShownModal(-1)}
                transparent={false}
                contentContainerStyle={themeContext.darkMode ? stylesDark.modal : styles.modal}
              >
                <View>
                  <Text style={themeContext.darkMode ? stylesDark.modalText : styles.modalText}>
                    {JSON.stringify(workoutObject)}
                  </Text>
                </View>
              </Modal>
            </Portal>
          </View>
        ))}
      </ScrollView>
    </Provider>
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
  },
  modal: {
    backgroundColor: DarkModeColors.ContentBackground,
    color: DarkModeColors.ContentForeground,
    margin: "auto",
    width: "90%",
    height: "70%"
  },
  modalText: {
    color: DarkModeColors.CardForeground
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
  },
  modal: {
    backgroundColor: LightModeColors.CardBackground,    
    margin: "auto",
    width: "90%",
    height: "70%"
  },
  modalText: {
    color: LightModeColors.CardForeground
  }
});

export default HomeScreen;