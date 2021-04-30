import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { ScrollView, View, StyleSheet, Text, TextInput, TouchableOpacity} from 'react-native';
import { Button } from 'react-native-paper';
import { LightModeColors, DarkModeColors } from '../../../styles/colors';
import  AppDataContext  from '../../../contexts/appDataContext';
import { FISICO_API_URL, FISICO_URL } from '../../../utils/urls';
import {validateEmail} from '../../../utils/accountValidation';
import Ionicons from 'react-native-vector-icons/Ionicons';

const NewGroupScreen = ( {navigation}) => {
  const appDataContext = useContext(AppDataContext);

  const [newRecipients, setNewRecipients] = useState([]);
  const [newRecipient, setNewRecipient] = useState('');
  const [invalidEmail, setInvalidEmail] = useState(false);

  const handleTextChanged = (text) => {
    setNewRecipient(text);
    if (!validateEmail(text)) {
      setInvalidEmail(true);
    } else {
      setInvalidEmail(false);
    }
  }

  const handleAddRecipient = () => {
    let tempRecips = newRecipients;
    if (newRecipient != '' && validateEmail(newRecipient)) {
      tempRecips.push(newRecipient);
      setNewRecipients([...tempRecips]);
      setNewRecipient('');
    }
  }

  const handleCreateGroup = async () => {
    if (newRecipient != '' && validateEmail(newRecipient)){
      handleAddRecipient();
    }else if (newRecipient == '') {
      // You need to include yourself in there.
      let tempRecips = newRecipients;
      tempRecips.push(appDataContext.email);
      setNewRecipients([...tempRecips]);

      await sendPostGroup();

      await appDataContext.loadGroupsAndMessages();
      navigation.goBack();

    }
  }

  const sendPostGroup = async () => {
    if (newRecipients.length > 0) {
      try {
        let response = await fetch(FISICO_URL + '/groups', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: appDataContext.email,
          recipients: newRecipients
        })
      });
      let json = await response.json();
      console.log('JSON: ' + JSON.stringify(json));
      if (json.success == true) {
        console.log('Group Created');
        setNewRecipient('');
        setNewRecipients([]);
      }else {
        console.log('Group Failed to Create');
      }
      }catch (error) {
        console.error(error);
      }
    }

  }

  return (
    <ScrollView>

      <Text style={styles.label}>Create Group</Text>
      {invalidEmail ? <Text style={styles.warning}>Invalid Email</Text> : null}

      <TextInput
        onChangeText={text => handleTextChanged(text)}
        style={styles.field}
        value={newRecipient}
        placeholder='Recipient Email'
      />

      <View style={styles.row}>
      <Button style={styles.button} mode='contained' onPress={() => navigation.goBack()}>Cancel</Button>
        <Button style={styles.button} mode='contained' onPress={handleAddRecipient}>Add</Button>
        <Button style={styles.button} mode='contained' onPress={handleCreateGroup}>Create</Button>
      </View>
      {newRecipients.map((recipObject, recipKey) =>
        <Text key={recipKey} style={styles.paragraph}>{recipObject}</Text>
      )}
    </ScrollView>
  )
}

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 24,
      backgroundColor: LightModeColors.ContentBackground,
    },
    label: {
      color: LightModeColors.ContentForeground,
      fontSize: 32,
      fontWeight: "bold",
      textAlign: 'center',
      marginTop: 5,
      marginBottom: 5,
    },
    paragraph: {
      color: LightModeColors.ContentForeground,
      fontSize: 14,
      textAlign: 'center',
      marginTop: 5,
      marginBottom: 5,
    },
    field: {
      padding: 5,
      height:40,
      marginBottom: 5,
      marginTop: 5,
      marginHorizontal: 10,
      backgroundColor: LightModeColors.FieldBackground,
      color: LightModeColors.FieldForeground,
    },
    warning: {
      color: LightModeColors.Warning,
      fontSize: 14,
      textAlign: 'center'
    },
    button: {
      marginTop: 5,
      marginBottom: 5,
      width: 120,
      backgroundColor: LightModeColors.MenuBackground
    },
    buttonLabel: {
        color: DarkModeColors.ContentForeground,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        margin: 5,
        padding: 5,
        paddingBottom: 20,
    },
    details: {
        backgroundColor: LightModeColors.CardBackground,
    },
    icon: {
      padding: 5,
      margin: 5
    }
  })


export default NewGroupScreen;