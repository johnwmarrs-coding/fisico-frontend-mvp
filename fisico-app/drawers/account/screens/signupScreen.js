import React, { useState } from 'react';
import { View, StyleSheet, TextInput} from 'react-native';
import {DarkModeColors, LightModeColors} from '../../../styles/colors';
import { useContext } from 'react';
import ThemeContext from '../../../contexts/themeContext';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Title, Text, Button } from 'react-native-paper';
import { validateEmail, validatePassword} from '../../../utils/accountValidation';



const SignupScreen = ( {navigation} ) => {
  const themeContext = useContext(ThemeContext);
  const [text, setText] = useState('');
  const [emailText, setEmailText] = useState('');
  const [displayNameText, setDisplayNameText] = useState('');
  const [passwordText, setPasswordText] = useState('');
  const [verifyPasswordText, setVerifyPasswordText] = useState('');
  return (
    <View style={themeContext.darkMode ? stylesDark.container : styles.container }>
      <Title style={themeContext.darkMode ? stylesDark.label : styles.label }>Welcome!</Title>
      <Text style={themeContext.darkMode ? stylesDark.paragraph : styles.paragraph }>
        Signing up lets you use social features, and save your data to the cloud!.
      </Text>
      {
        emailText != '' && !validateEmail(emailText) 
        ? <Text style={themeContext.darkMode ? stylesDark.warning : styles.warning}>
            Invalid Email Address
          </Text>
        : null
      }
      <TextInput
        style={themeContext.darkMode ? stylesDark.field : styles.field}
        placeholder='Email'
        onChangeText={text => setEmailText(text)}
        value={emailText}
        placeholderTextColor={themeContext.darkMode ? DarkModeColors.FieldPlaceholder : LightModeColors.FieldPlaceholder}
      />
      
      <TextInput
        style={themeContext.darkMode ? stylesDark.field : styles.field}
        placeholder='Display Name'
        onChangeText={text => setDisplayNameText(text)}
        value={displayNameText}
        placeholderTextColor={themeContext.darkMode ? DarkModeColors.FieldPlaceholder : LightModeColors.FieldPlaceholder}
      />
      {
        passwordText != '' && !validatePassword(passwordText) 
        ? <Text style={themeContext.darkMode ? stylesDark.warning : styles.warning}>
            Password must be at least 6 characters long, and must contain a number, lowercase, and capital letter.
          </Text>
        : null
      }
      <TextInput
        style={themeContext.darkMode ? stylesDark.field : styles.field}
        placeholder='Password'
        onChangeText={text => setPasswordText(text)}
        value={passwordText}
        secureTextEntry={true}
        placeholderTextColor={themeContext.darkMode ? DarkModeColors.FieldPlaceholder : LightModeColors.FieldPlaceholder}
      />
      {
        verifyPasswordText != '' && passwordText != verifyPasswordText
        ? <Text style={themeContext.darkMode ? stylesDark.warning : styles.warning}>
            Passwords must match!
          </Text>
        : null
      }
      <TextInput
        style={themeContext.darkMode ? stylesDark.field : styles.field}
        placeholder='Verify Password'
        onChangeText={text => setVerifyPasswordText(text)}
        value={verifyPasswordText}
        secureTextEntry={true}
        placeholderTextColor={themeContext.darkMode ? DarkModeColors.FieldPlaceholder : LightModeColors.FieldPlaceholder}
      />
      <Button style={{marginTop: 5, marginBottom: 5}} onPress={() => console.log('Submit Pressed')} mode='contained'>Sign Up</Button>
      <View style={{flexDirection: 'row', justifyContent:'center', alignItems:'center'}}>
        <Text style={themeContext.darkMode ? stylesDark.paragraph : styles.paragraph }>Already a User?</Text>
        <Button 
        mode='text' onPress={() => navigation.navigate('Signin')}
        color={themeContext.darkMode ? DarkModeColors.Link : LightModeColors.Link}>
          Sign In
        </Button>
      </View>
    </View>
  )
}

const stylesDark = {
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
    height:40,
    marginBottom: 5,
    marginTop: 5,
    backgroundColor: DarkModeColors.FieldBackground,
    color: DarkModeColors.FieldForeground,
  },
  warning: {
    color: DarkModeColors.Warning,
    fontSize: 14
  }
};

const styles = {
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
    height:40,
    marginBottom: 5,
    marginTop: 5,
    backgroundColor: LightModeColors.FieldBackground,
    color: LightModeColors.FieldForeground,
  },
  warning: {
    color: LightModeColors.Warning,
    fontSize: 14
  }
};
export default SignupScreen;