import React from 'react';
import { Text, View } from 'react-native';
import Header from '../../shared/header';
import HomeScreen from './screens/homeScreen';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();
const Diet = ( {navigation}) => {
  return (
    <Stack.Navigator header={Header}>
      <Stack.Screen name="Diet/Home" component={HomeScreen} options={
        {
          header:  () => <Header toggleDrawer={navigation.toggleDrawer} openSignin={() => navigation.navigate('Account')} title="Diet"/>
        }
      }/>
    </Stack.Navigator>
  )
}
export default Diet;