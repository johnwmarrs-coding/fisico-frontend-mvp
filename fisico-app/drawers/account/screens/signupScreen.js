import React, { useState } from 'react';
import { View, StyleSheet, TextInput, ActivityIndicator} from 'react-native';
import {DarkModeColors, LightModeColors} from '../../../styles/colors';
import { useContext } from 'react';
import ThemeContext from '../../../contexts/themeContext';
import AppDataContext from '../../../contexts/appDataContext';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Title, Text, Button } from 'react-native-paper';
import { validateEmail, validatePassword, hashString} from '../../../utils/accountValidation';
import { FISICO_URL } from '../../../utils/urls';



const SignupScreen = ( {navigation} ) => {
  const themeContext = useContext(ThemeContext);
  const appDataContext = useContext(AppDataContext);

  const [loginFailed, setLoginFailed] = useState(false);
  const [isWorking, setIsWorking] = useState(false);

  const [text, setText] = useState('');
  const [emailText, setEmailText] = useState('');
  const [displayNameText, setDisplayNameText] = useState('');
  const [passwordText, setPasswordText] = useState('');
  const [verifyPasswordText, setVerifyPasswordText] = useState('');

  const sendSignupRequest = async () => {
    setIsWorking(true);
    try {
      let response = await fetch(FISICO_URL + '/user/signup', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          'username': displayNameText,
          'email': emailText,
          'password_hash': hashString(passwordText),
        })
      });
      let json = await response.json();
      if (json.success) {
        console.log('SUCCESS');
        console.log('MESSAGE: ' + json.msg);
        console.log('TOKEN: ' + json.token_hash);
        console.log(JSON.stringify(json));
        appDataContext.setEmail(emailText);
        appDataContext.setDisplayName(displayNameText);
        appDataContext.setLoggedIn(true);
        appDataContext.setAuthToken(json.token_hash);
      }else {
        console.log("FAILURE");
        console.log(JSON.stringify(json));
        setLoginFailed(true);
      }
      
    } catch (error) {
      console.error(error);
      setLoginFailed(true);
    }
    setIsWorking(false);
  }
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
      { isWorking? <ActivityIndicator/> :
      <Button disabled={!(validateEmail(emailText) && passwordText == verifyPasswordText && displayNameText != '' && validatePassword(passwordText))} 
        style={themeContext.darkMode ? stylesDark.button : styles.button} 
        labelStyle={{color: themeContext.darkMode ? DarkModeColors.ContentForeground : DarkModeColors.ContentForeground}}
        onPress={sendSignupRequest}
        mode='contained'>
          Sign Up
      </Button>
      }
      {
        loginFailed ? 
        <Text style={themeContext.darkMode ? stylesDark.warning : styles.warning}>
          Login Failed
        </Text>
        : null
      }
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
    fontSize: 14,
    textAlign: 'center'
  },
  button: {
    marginTop: 5,
    marginBottom: 5,
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
    fontSize: 14,
    textAlign: 'center'
  },
  button: {
    marginTop: 5,
    marginBottom: 5,
  },
};
export default SignupScreen;