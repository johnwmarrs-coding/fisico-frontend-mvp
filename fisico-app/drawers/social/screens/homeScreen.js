import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { ScrollView, View, StyleSheet, Text , Button} from 'react-native';
import { LightModeColors, DarkModeColors } from '../../../styles/colors';
import  AppDataContext  from '../../../contexts/appDataContext';
import { FISICO_API_URL, FISICO_URL } from '../../../utils/urls';
import GroupPreview from '../groupPreview';

const HomeScreen = ( {navigation}) => {
  const appDataContext = useContext(AppDataContext);

    /*
  useEffect(()=> {
    appDataContext.setGroups([{group: {recipients: ['John', 'Other']}, messages: []}])
  }, []);
  */

  return (
    <ScrollView style={styles.container} listener={appDataContext.groups}>
        {appDataContext.groups.map((groupObject, groupKey) => (
          <GroupPreview 
            key={groupKey}
            recipients={groupObject.group.recipients} 
            lastMessage={groupObject.messages.length > 0 ? groupObject.messages[groupObject.messages.length - 1].message : 'No Messages'} 
            openGroup={()=> navigation.navigate("Social/Group", {group: groupObject.group, messages: groupObject.messages})}/>
        ))}
    </ScrollView>
  )
}

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 15,
      margin: 0,
      backgroundColor: LightModeColors.Content,
    },
  })


export default HomeScreen;