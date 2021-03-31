import React from 'react';
import { useContext } from 'react';
import { Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeTab from './tabs/homeTab'
import CalendarTab from './tabs/calendarTab'
import AnalyticsTab from './tabs/analyticsTab'
import {DarkModeColors, LightModeColors} from '../../styles/colors';

import Ionicons from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

const Activity = () => {
  return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused
                ? 'home' : 'home-outline';
            } else if (route.name === 'Calendar') {
              iconName = focused ? 'calendar' : 'calendar-outline';
            } else if (route.name === 'Analytics') {
              iconName = focused ? 'analytics' : 'analytics-outline';
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: LightModeColors.MenuForegroundFocused,
          inactiveTintColor: LightModeColors.MenuForeground,
          style: {
            backgroundColor: LightModeColors.MenuBackground,
          }
        }}
      >
          <Tab.Screen name="Home" component={HomeTab}/>
          <Tab.Screen name="Calendar" component={CalendarTab}/>
          <Tab.Screen name="Analytics" component={AnalyticsTab}/>
      </Tab.Navigator>
  )
}
export default Activity;