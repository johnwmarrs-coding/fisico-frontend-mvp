import React, { useState } from 'react';
import { View, StyleSheet, TextInput} from 'react-native';
import {DarkModeColors, LightModeColors} from '../../../styles/colors';
import { useContext } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Title, Text, Button } from 'react-native-paper';
import { validateEmail, hashString } from '../../../utils/accountValidation';
import AppDataContext from '../../../contexts/appDataContext';
import { FISICO_URL } from '../../../utils/urls';
import { SaveWorkoutArray } from '../../../utils/workoutStorage';



const HomeScreen = ( {navigation} ) => {
  const appDataContext = useContext(AppDataContext);

  const sendLogoutRequest = async () => {
    try {
      let response = await fetch(FISICO_URL + '/user/logoff', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          'token_hash': appDataContext.authToken,
          'user_id': appDataContext.userID
        })
      });
      let json = await response.json();
      if (json.success) {
        console.log('SUCCESS: TOKEN DESTROYED ON SERVER');
        console.log('MESSAGE: ' + json.msg);
        console.log(JSON.stringify(json));
      }else {
        console.log("FAILURE: TOKEN NOT DESTROYED ON SERVER");
        console.log(JSON.stringify(json));
      }
      
    } catch (error) {
      console.error(error);
    } finally {
        appDataContext.setEmail(null);
        appDataContext.setDisplayName(null);
        appDataContext.setLoggedIn(false);
        appDataContext.setAuthToken(null);
        appDataContext.storeUserInfo('', '');
    }
  }

  const clearLocalData = async () => {
    await SaveWorkoutArray([]);
    appDataContext.triggerRefresh();
  }

  return (
    <View style={styles.container }>

      <Button
        mode="contained"
        style={styles.button} 
        labelStyle={{color: DarkModeColors.ContentForeground}}
        onPress={sendLogoutRequest}>
         Log Out
      </Button>
      <Button
        mode="outlined"
        style={styles.button} 
        labelStyle={{color: DarkModeColors.Warning}}
        onPress={clearLocalData}>
         Clear Data
      </Button>
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
      fontSize: 14
    },
    button: {
      marginTop: 5,
      marginBottom: 5,
    },
  };
export default HomeScreen;