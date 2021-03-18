import React from 'react';
import { useContext } from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import { LightModeColors, DarkModeColors } from '../../../../styles/colors';
import Workout from '../../workout';
import ThemeContext from '../../../../contexts/themeContext';

const HomeScreen = () => {
  const themeContext = useContext(ThemeContext);
  return (
    <ScrollView style={themeContext.darkMode ? stylesDark.container : styles.container}>
      <Workout/>
      <Workout/>
      <Workout/>
      <Workout/>
      <Workout/>
      <Workout/>
      <Workout/>
      <Workout/>
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