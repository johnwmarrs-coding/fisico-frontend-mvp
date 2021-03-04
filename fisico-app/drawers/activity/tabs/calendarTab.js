import React from 'react';
import { Text, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import CalendarScreen from './screens/calendarScreen'


const Stack = createStackNavigator();
const CalendarTab = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Activity/Calendar" component={CalendarScreen}/>
    </Stack.Navigator>
  )
}
export default CalendarTab;