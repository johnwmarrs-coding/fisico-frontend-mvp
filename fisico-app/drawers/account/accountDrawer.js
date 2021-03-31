import React, {useContext} from 'react';
import { Text, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import SigninScreen from './screens/signinScreen';
import SignupScreen from './screens/signupScreen';
import HomeScreen from './screens/homeScreen';
import Header from '../../shared/header';
import AppDataContext from '../../contexts/appDataContext';

const Stack = createStackNavigator();
const HomeTab = ( {navigation}) => {
  const appDataContext = useContext(AppDataContext);
  return (
    !appDataContext.loggedIn ?
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
    :
    <Stack.Navigator header={Header}>
      <Stack.Screen name="Signin" component={HomeScreen} options={
        {
          header:  () => <Header toggleDrawer={navigation.toggleDrawer} openSignin={() => navigation.navigate('Signin')} title="Account"/>
        }
      }/>
    </Stack.Navigator>
    
  )
}
export default HomeTab;