import React from 'react';
import { Text, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/homeScreen'


const Stack = createStackNavigator();
const HomeTab = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Activity/Home" component={HomeScreen}/>
    </Stack.Navigator>
  )
}
export default HomeTab;