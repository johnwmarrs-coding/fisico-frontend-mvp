import React from 'react';
import { Text, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import SigninScreen from './screens/signinScreen';
import SignupScreen from './screens/signupScreen';
import Header from '../../shared/header';

const Stack = createStackNavigator();
const HomeTab = ( {navigation}) => {
  return (
    <Stack.Navigator header={Header}>
      <Stack.Screen name="Signin" component={SigninScreen} options={
        {
          header:  () => <Header toggleDrawer={navigation.toggleDrawer} openSignin={() => navigation.navigate('Signin')} title="Sign In"/>
        }
      }/>
      <Stack.Screen name="Signup" component={SignupScreen} options={
        {
          header:  () => <Header toggleDrawer={navigation.toggleDrawer} openSignin={() => navigation.navigate('Signin')} title="Sign Up"/>
        }
      }/>
    </Stack.Navigator>
  )
}
export default HomeTab;