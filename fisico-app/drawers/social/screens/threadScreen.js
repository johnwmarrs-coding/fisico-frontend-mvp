import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { ScrollView, View, StyleSheet, Text , Button} from 'react-native';
import { LightModeColors, DarkModeColors } from '../../../styles/colors';
import  AppDataContext  from '../../../contexts/appDataContext';
import { FISICO_API_URL, FISICO_URL } from '../../../utils/urls';

const ThreadScreen = ( {navigation}) => {
  const appDataContext = useContext(AppDataContext);

  return (
    <ScrollView style={styles.container}>
        <Text>Messages</Text>
    </ScrollView>
  )
}

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 15,
      backgroundColor: LightModeColors.Content,
    },
  })


export default ThreadScreen;