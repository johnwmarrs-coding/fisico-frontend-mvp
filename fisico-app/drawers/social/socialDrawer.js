import React from 'react';
import { Text, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/homeScreen';
import GroupScreen from './screens/groupScreen';
import NewGroupScreen from './screens/newGroupScreen';
import Header from '../../shared/header';

const Stack = createStackNavigator();
const Social = ( {navigation}) => {
  return (
    <Stack.Navigator header={Header}>
      <Stack.Screen name="Social/Home" component={HomeScreen} options={
        {
          header:  () => <Header toggleDrawer={navigation.toggleDrawer} openSignin={() => navigation.navigate('Account')} title="Messages"/>
        }
      }/>
      <Stack.Screen name="Social/Group" component={GroupScreen} options={
        {
          header:  () => <Header toggleDrawer={navigation.toggleDrawer} openSignin={() => navigation.navigate('Account')} title="Conversation"/>
        }
      }/>
      <Stack.Screen name="Social/NewGroup" component={NewGroupScreen} options={
        {
          header:  () => <Header toggleDrawer={navigation.toggleDrawer} openSignin={() => navigation.navigate('Account')} title="New Conversation"/>
        }
      }/>
    </Stack.Navigator>
  )
}
export default Social;