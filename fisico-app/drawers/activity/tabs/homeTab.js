import React from 'react';
import { Text, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/homeScreen';
import Header from '../../../shared/header';

const Stack = createStackNavigator();
const HomeTab = ( {navigation}) => {
  return (
    <Stack.Navigator header={Header}>
      <Stack.Screen name="Activity/Home" component={HomeScreen} options={
        {
          header: () => <Header toggleDrawer={navigation.toggleDrawer} title="Activities"/>,
        }
      }/>
    </Stack.Navigator>
  )
}
export default HomeTab;