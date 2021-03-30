import React from 'react';
import { useContext } from 'react';
import { StyleSheet, Text, View, Switch } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ThemeContext from '../../../../contexts/themeContext'
import {DarkModeColors, LightModeColors} from '../../../../styles/colors'

const HomeScreen = ({navigation}) => {
  const themeContext = useContext(ThemeContext);
  return (
    <View style={themeContext.darkMode ? stylesDark.container : styles.container}>
      <Text style={themeContext.darkMode ? stylesDark.label : styles.label}>Dark Mode</Text>
      <Switch onValueChange={themeContext.toggleDarkMode} value={themeContext.darkMode}/>
    </View>
  )
}

const stylesDark = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: DarkModeColors.ContentBackground
  },
  label: {
    color: DarkModeColors.ContentForeground,
    textAlign: 'left',
    fontSize: 20,
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
    textAlign: "left",
    fontSize: 20,
  }
});
export default HomeScreen;