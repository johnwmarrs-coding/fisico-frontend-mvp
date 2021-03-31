import React from 'react';
import { useContext } from 'react';
import { StyleSheet, Text, View, Switch } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {DarkModeColors, LightModeColors} from '../../../../styles/colors'

const HomeScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
     
    </View>
  )
}

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