import React, { useState } from 'react';
import { ScrollView, View, StyleSheet, Text, TextInput, Button } from 'react-native';
import { LightModeColors, DarkModeColors } from '../../../../styles/colors';
import ThemeContext from '../../../../contexts/themeContext';

const Result = (props) => {
    return (
        <View style={{flexDirection: 'row'}}>
            <Text></Text>
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

export default Result;