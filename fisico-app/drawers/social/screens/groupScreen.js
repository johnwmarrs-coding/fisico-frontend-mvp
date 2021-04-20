import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { ScrollView, View, StyleSheet, Text, TouchableOpacity, TextInput} from 'react-native';
import { LightModeColors, DarkModeColors } from '../../../styles/colors';
import  AppDataContext  from '../../../contexts/appDataContext';
import { FISICO_API_URL, FISICO_URL } from '../../../utils/urls';
import MessageBubble from '../messageBubble';
import {Button} from 'react-native-paper';

const GroupScreen = ( {route, navigation}) => {
  const appDataContext = useContext(AppDataContext);
  const {group, messages} = route.params;

  const [newMessage, setNewMessage] = useState('');

  const sendPostMessage = async () => {
    if (newMessage != '') {
      try {
        let response = await fetch('http://localhost:3001/messages', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          group: group._id,
          name: appDataContext.email,
          message: newMessage,
        })
      });
      let json = await response.json();
      console.log('JSON: ' + JSON.stringify(json));
      if (json.success == true) {
        console.log('Message Sent');
      }else {
        console.log('Message failed to send');
      }
      }catch (error) {
        console.error(error);
      }
    }
  }


  return (
    <View style={{flex: 1, flexDirection: 'column'}}>
      <ScrollView style={styles.container}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text>Go Back</Text>
        </TouchableOpacity>
          {messages.map((messageObject, messageKey) =>
            <MessageBubble key={messageKey} message={messageObject.message} recipients={group.recipients} sender={messageObject.name}/>
          )}
      </ScrollView>
      <View style={{flexDirection: 'row', width: '100%', justifyContent: 'space-between', margin: 5, alignSelf: 'flex-end', height:50}}>
        <TextInput style={styles.field} multiline={true} onChangeText={(text) => setNewMessage(text)} defaultValue={newMessage}/>
        <Button style={styles.button} mode='contained' onPress={sendPostMessage}>Send</Button>
      </View>
    </View>
  )
}

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 15,
      backgroundColor: LightModeColors.ContentBackground,
    },
    button: {
      width: 100,
      height: 40,
      margin: 3,
      backgroundColor: LightModeColors.MenuBackground
    },
    field: {
      padding: 5,
      backgroundColor: LightModeColors.FieldBackground,
      color: LightModeColors.FieldForeground,
      borderColor: LightModeColors.FieldBorder,
      flex: 1,
      borderRadius: 10,
    },
  })

  

export default GroupScreen;