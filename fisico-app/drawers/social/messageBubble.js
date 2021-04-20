import React, { useState, useContext } from 'react';
import { StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import { LightModeColors, DarkModeColors } from '../../styles/colors';
import AppDataContext from '../../contexts/appDataContext';



const MessageBubble = (props) => {

  const appDataContext = useContext(AppDataContext);

  const formatRecipients = (recipients) => {
      let results = '';
      for (let i = 0; i < recipients.length; i++) {
        if (recipients[i] != appDataContext.email) {
          results += recipients[i];
          if (i != recipients.length - 1) {
            results += ', '
          }
        }
      }
      if (results[results.length-1] == ' ') {
        results = results.substr(0, results.length-2);
      }
      return results;
  }

  return (
    <View style={[styles.container, appDataContext.email == props.sender ? {justifyContent: 'flex-end'} : {justifyContent: 'flex-start'} ]}>
        <View style={appDataContext.email == props.sender ? styles.bubbleSender : styles.bubbleReceiver}>
            <Text style={styles.recipients}>{props.sender}</Text>
            <Text style={styles.content}>{props.message}</Text>
        </View>
    </View>
  )
}

  const styles = StyleSheet.create({
    container: {
        padding: 5,
        margin: 5,
        backgroundColor: LightModeColors.ContentBackground,
        flexDirection: 'row',
        display: 'flex',
        flex: 1,
    },
    bubbleSender: {
        maxWidth: 280,
        margin: 5,
        padding: 5,
        borderColor: 'black',
        borderRadius: 10,
        borderWidth: 1,
    },
    bubbleReceiver: {
        maxWidth: 280,
        margin: 5,
        padding: 5,
        borderColor: 'black',
        borderRadius: 10,
        borderWidth: 1,
    },
    recipients: {
        fontWeight: 'bold',
        fontSize: 14,
    },
    content: {
        fontSize: 12,
    },
  })


export default MessageBubble;