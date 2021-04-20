import React, { useState, useContext } from 'react';
import { StyleSheet, Text, TouchableOpacity} from 'react-native';
import { LightModeColors, DarkModeColors } from '../../styles/colors';
import AppDataContext from '../../contexts/appDataContext';



const GroupPreview = (props) => {

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

  const createPreview = (lastMessage) => {
      let result = '';
      result = lastMessage.substr(0, 20);
      if (lastMessage.length > result.length) {
        result += '...'
      }
      return result;
  }

  return (
    <TouchableOpacity onPress={() => {console.log('Opacity Pressed'); props.openGroup()}} style={styles.opacity}>
        <Text style={styles.recipients}>{formatRecipients(props.recipients)}</Text>
        <Text style={styles.content}>{createPreview(props.lastMessage)}</Text>
    </TouchableOpacity>
  )
}

  const styles = StyleSheet.create({
    opacity: {
      padding: 10,
      margin: 0,
      backgroundColor: LightModeColors.ContentBackground,
      height: 80,
      width: '100%',
    },
    recipients: {
        fontWeight: 'bold',
        fontSize: 20,
    },
    content: {
        fontSize: 14,
    },
  })


export default GroupPreview;