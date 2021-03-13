import React from 'react';
import { Text, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const CalendarScreen = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
      }}>
      <Text>Calendar Screen</Text>
      <Ionicons name="calendar" size={30} color="#900" />
    </View>
  )
}
export default CalendarScreen;