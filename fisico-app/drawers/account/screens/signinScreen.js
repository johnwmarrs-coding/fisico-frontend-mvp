import React, { useState } from 'react';
import { Text, View, StyleSheet, TextInput, Button} from 'react-native';
import {DarkModeColors, LightModeColors} from '../../../styles/colors';
import { useContext } from 'react';
import ThemeContext from '../../../contexts/themeContext';
import Ionicons from 'react-native-vector-icons/Ionicons';



const SigninScreen = () => {
  const themeContext = useContext(ThemeContext);
  const [text, setText] = useState('');
  return (
    <View style={themeContext.darkMode ? stylesDark.container : styles.container }>
      <Text style={themeContext.darkMode ? stylesDark.label : styles.label }>Email</Text>
      <TextInput
        style={{height: 40, backgroundColor: '#222222', padding: 10}}
        placeholder="Type here to translate!"
        onChangeText={text => setText(text)}
        defaultValue={text}
      />
      <Text style={themeContext.darkMode ? stylesDark.label : styles.label }>Password</Text>
      <TextInput
        style={{height: 40, backgroundColor: '#222222', padding: 10}}
        placeholder="Type here to translate!"
        onChangeText={text => setText(text)}
        defaultValue={text}
        secureTextEntry={true}
      />
      <Button onPress={() => setText('PRESSED')} 
        title="Submit"
        color="#841584"
        accessibilityLabel="Learn more about this purple button"
      />
    </View>
  )
}

const stylesDark = StyleSheet.create({
    container: {
      flex: 1,
      padding: 24,
      backgroundColor: DarkModeColors.ContentBackground,
    },
    label: {
      color: DarkModeColors.ContentForeground,
      fontSize: 20,
      fontWeight: "bold"
    }
  });
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 24,
      backgroundColor: LightModeColors.ContentBackground,
    },
    label: {
      color: LightModeColors.ContentForeground,
      fontSize: 20,
      fontWeight: "bold"
    }
  });
export default SigninScreen;