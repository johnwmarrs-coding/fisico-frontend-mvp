import React, { useState } from 'react';
import { View, StyleSheet} from 'react-native';
import {DarkModeColors, LightModeColors} from '../../../styles/colors';
import { useContext } from 'react';
import ThemeContext from '../../../contexts/themeContext';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { TextInput, Title, Text, Button } from 'react-native-paper';



const SignupScreen = ( {navigation} ) => {
  const themeContext = useContext(ThemeContext);
  const [text, setText] = useState('');
  return (
    <View style={themeContext.darkMode ? stylesDark.container : styles.container }>
      <Title style={themeContext.darkMode ? stylesDark.label : styles.label }>Welcome!</Title>
      <Text style={themeContext.darkMode ? stylesDark.paragraph : styles.paragraph }>
        Signing up lets you use social features, and save your data to the cloud!.
      </Text>
      <TextInput
        style={themeContext.darkMode ? stylesDark.field : styles.field}
        label='Email'
        onChangeText={text => setText(text)}
        value={text}
        mode='outlined'
      />
      <TextInput
        style={themeContext.darkMode ? stylesDark.field : styles.field}
        label='Display Name'
        onChangeText={text => setText(text)}
        value={text}
        mode='outlined'
      />
      <TextInput
        style={themeContext.darkMode ? stylesDark.field : styles.field}
        label='Password'
        onChangeText={text => setText(text)}
        value={text}
        secureTextEntry={true}
        mode='outlined'
      />
      <TextInput
        style={themeContext.darkMode ? stylesDark.field : styles.field}
        label='Verify Password'
        onChangeText={text => setText(text)}
        value={text}
        secureTextEntry={true}
        mode='outlined'
      />
      <Button onPress={() => setText('PRESSED')} mode='contained'>Sign Up</Button>
      <View style={{flexDirection: 'row', justifyContent:'center', alignItems:'center'}}>
        <Text style={themeContext.darkMode ? stylesDark.paragraph : styles.paragraph }>Already a User?</Text>
        <Button mode='text' onPress={() => navigation.navigate('Signin')}>Sign In</Button>
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
export default SignupScreen;