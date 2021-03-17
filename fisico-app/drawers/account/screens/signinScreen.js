import React, { useState } from 'react';
import { View, StyleSheet} from 'react-native';
import {DarkModeColors, LightModeColors} from '../../../styles/colors';
import { useContext } from 'react';
import ThemeContext from '../../../contexts/themeContext';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { TextInput, Title, Text, Button } from 'react-native-paper';
import { validateEmail } from '../../../utils/accountValidation';



const SigninScreen = ( {navigation} ) => {
  const themeContext = useContext(ThemeContext);
  const [emailText, setEmailText] = useState('');
  const [passwordText, setPasswordText] = useState('');
  return (
    <View style={themeContext.darkMode ? stylesDark.container : styles.container }>
      <Title style={themeContext.darkMode ? stylesDark.label : styles.label }>Welcome!</Title>
      <Text style={themeContext.darkMode ? stylesDark.paragraph : styles.paragraph }>
        Sign in to use social features and save your data in the cloud.
      </Text>
      {emailText != '' && !validateEmail(emailText) ? <Text>Invalid Email Address</Text>: null}
      <TextInput
        style={themeContext.darkMode ? stylesDark.field : styles.field}
        label='Email'
        onChangeText={text => setEmailText(text)}
        value={emailText}
        mode='outlined'
      />
      <TextInput
        style={themeContext.darkMode ? stylesDark.field : styles.field}
        label='Password'
        onChangeText={text => setPasswordText(text)}
        value={passwordText}
        secureTextEntry={true}
        mode='outlined'
      />
      <Button onPress={() => console.log('Button Pressed')} mode='contained'>Sign in</Button>
      <View style={{flexDirection: 'row', justifyContent:'center', alignItems:'center'}}>
        <Text style={themeContext.darkMode ? stylesDark.paragraph : styles.paragraph }>New User?</Text>
        <Button mode='text' onPress={() => navigation.navigate('Signup')}>Sign Up</Button>
      </View>
    </View>
  )
}

const stylesDark = StyleSheet.create({
    container: {
      flex: 1,
      padding: 24,
      backgroundColor: DarkModeColors.ContentBackground,
      justifyContent: 'flex-start',
    },
    label: {
      color: DarkModeColors.ContentForeground,
      fontSize: 32,
      fontWeight: "bold",
      textAlign: 'center'
    },
    paragraph: {
      color: DarkModeColors.ContentForeground,
      fontSize: 14,
      textAlign: 'center'
    },
    field: {
      padding: 5,
      height:40
    }
  });
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 24,
      backgroundColor: LightModeColors.ContentBackground,
      justifyContent: 'flex-start',
    },
    label: {
      color: LightModeColors.ContentForeground,
      fontSize: 32,
      fontWeight: "bold",
      textAlign: 'center'
    },
    paragraph: {
      color: LightModeColors.ContentForeground,
      fontSize: 14,
      textAlign: 'center'
    },
    field: {
      padding: 5,
      height:40
    }
  });
export default SigninScreen;