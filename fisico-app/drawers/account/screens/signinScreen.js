import React, { useState } from 'react';
import { View, StyleSheet, TextInput, ActivityIndicator} from 'react-native';
import {DarkModeColors, LightModeColors} from '../../../styles/colors';
import { useContext } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Title, Text, Button } from 'react-native-paper';
import { validateEmail, hashString } from '../../../utils/accountValidation';
import AppDataContext from '../../../contexts/appDataContext';
import { FISICO_URL } from '../../../utils/urls';



const SigninScreen = ( {navigation} ) => {
  const appDataContext = useContext(AppDataContext);

  const [emailText, setEmailText] = useState('');
  const [passwordText, setPasswordText] = useState('');
  const [loginFailed, setLoginFailed] = useState(false);
  const [isWorking, setIsWorking] = useState(false);

  const sendSigninRequest = async () => {
    try {
      let response = await fetch(FISICO_URL + '/user/login', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          'email': emailText,
          'password_hash': hashString(passwordText),
        })
      });
      let json = await response.json();
      if (json.success) {
        console.log('SUCCESS');
        console.log('MESSAGE: ' + json.msg);
        console.log('TOKEN: ' + json.data.token_hash);
        console.log('user_id: ' + json.data.user_id);
        console.log(JSON.stringify(json));
        appDataContext.setEmail(emailText);
        appDataContext.setLoggedIn(true);
        appDataContext.setAuthToken(json.data.token_hash);
        appDataContext.setUserID(json.data.user_id);
        console.log('Attempting Save!');
        appDataContext.storeUserInfo(json.data.token_hash, json.data.user_id, emailText);
        appDataContext.setInitialLoad(true);

      }else {
        console.log("FAILURE");
        console.log(JSON.stringify(json));
        setLoginFailed(true);
      }
      
    } catch (error) {
      console.error(error);
      setLoginFailed(true);
    }
  }

    
  return (
    <View style={styles.container }>
      <Title style={styles.label }>Welcome!</Title>
      <Text style={styles.paragraph }>
        Sign in to use social features and save your data in the cloud.
      </Text>
      {
        emailText != '' && !validateEmail(emailText) ?
        <Text style={styles.warning}>
          Invalid Email Address
        </Text>
        : null
      }
      <TextInput
        style={styles.field}
        placeholder='Email'
        onChangeText={text => setEmailText(text)}
        value={emailText}
        placeholderTextColor={LightModeColors.FieldPlaceholder}
      />
      <TextInput
        style={styles.field}
        placeholder='Password'
        onChangeText={text => setPasswordText(text)}
        value={passwordText}
        secureTextEntry={true}
        placeholderTextColor={LightModeColors.FieldPlaceholder}
      />

      {isWorking ? <ActivityIndicator/> :
      <Button disabled={!validateEmail(emailText)}
       style={styles.button} 
       labelStyle={{color: DarkModeColors.ContentForeground}}
       onPress={() => {setIsWorking(true); sendSigninRequest(); setIsWorking(false);}} mode='contained'>
         Sign in
      </Button>
      }
      {
        loginFailed ? 
        <Text style={styles.warning}>
          Login Failed
        </Text>
        : null
      }
      <View style={{flexDirection: 'row', justifyContent:'center', alignItems:'center'}}>
        <Text style={styles.paragraph }>New User?</Text>
        <Button 
          mode='text' 
          onPress={() => navigation.navigate('Signup')}
          color={LightModeColors.Link}>
            Sign Up
        </Button>
      </View>
    </View>
  )
}
  
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
      textAlign: 'center',
      marginTop: 5,
      marginBottom: 5,
    },
    paragraph: {
      color: LightModeColors.ContentForeground,
      fontSize: 14,
      textAlign: 'center',
      marginTop: 5,
      marginBottom: 5,
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
export default SigninScreen;