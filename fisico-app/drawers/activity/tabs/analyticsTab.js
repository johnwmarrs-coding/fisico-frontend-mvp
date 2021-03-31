import React from 'react';
import { Text, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import AnalyticsScreen from './screens/analyticsScreen'
import Header from '../../../shared/header';
import ThemeContext from '../../../contexts/themeContext'


const Stack = createStackNavigator();
const AnalyticsTab = ({navigation}) => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Activity/Analytics" component={AnalyticsScreen} options={
          {
            header:  () => <Header toggleDrawer={navigation.toggleDrawer} openSignin={() => navigation.navigate('Account')} title="Analytics"/>
          }
        }
      />
    </Stack.Navigator>
  )
}
export default AnalyticsTab;