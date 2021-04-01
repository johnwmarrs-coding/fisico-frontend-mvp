import React from 'react';
import { Text, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import CalendarScreen from './screens/calendarScreen'
import Header from '../../../shared/header';
import PlanWorkoutScreen from './screens/planWorkoutScreen'


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
      <Stack.Screen name="PlanWorkoutScreen" component={PlanWorkoutScreen} options={
        {
          header:  () => <Header toggleDrawer={navigation.toggleDrawer} openSignin={() => navigation.navigate('Account')} title="Plan Workout"/>
        }
      }/>
    </Stack.Navigator>
  )
}
export default CalendarTab;