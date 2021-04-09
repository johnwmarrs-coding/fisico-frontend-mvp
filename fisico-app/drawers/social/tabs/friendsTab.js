import React from 'react';
import { Text, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import FriendsScreen from './screens/friendsScreen';
import Header from '../../../shared/header';

const Stack = createStackNavigator();
const FriendsTab = ( {navigation}) => {
  return (
    <Stack.Navigator header={Header}>
      <Stack.Screen name="Social/Friends" component={FriendsScreen} options={
        {
          header:  () => <Header toggleDrawer={navigation.toggleDrawer} openSignin={() => navigation.navigate('Account')} title="Friends"/>
        }
      }/>

    </Stack.Navigator>
  )
}
export default FriendsTab;