import React from 'react';
import { Text, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const AnalyticsScreen = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
      }}>
      <Text>Analytics Screen</Text>
      <Ionicons name="analytics" size={30} color="#900" />
    </View>
  )
}
export default AnalyticsScreen;