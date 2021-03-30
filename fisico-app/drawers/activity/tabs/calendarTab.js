import React from 'react';
import { Text, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import CalendarScreen from './screens/calendarScreen'
import Header from '../../../shared/header';


const Stack = createStackNavigator();
const CalendarTab = ( {navigation}) => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Activity/Calendar" component={CalendarScreen} options={
          {
            header:  () => <Header toggleDrawer={navigation.toggleDrawer} openSignin={() => navigation.navigate('Account')} title="Calendar"/>
          }
        }
      />
    </Stack.Navigator>
  )
}
export default CalendarTab;