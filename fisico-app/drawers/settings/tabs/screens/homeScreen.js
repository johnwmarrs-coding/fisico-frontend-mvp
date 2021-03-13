import React from 'react';
import { Text, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const HomeScreen = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
      }}>
      <Text>Home Screen - Settings</Text>
      <Ionicons name="home" size={30} color="#900" />
    </View>
  )
}
export default HomeScreen;