import 'react-native-gesture-handler'
import React, {useState, useEffect} from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import  Activity  from './drawers/activity/activityDrawer';
import  Account  from './drawers/account/accountDrawer';
import  Diet  from './drawers/diet/dietDrawer';
import  Health  from './drawers/health/healthDrawer';
import  Social  from './drawers/social/socialDrawer';
import  Settings  from './drawers/settings/settingsDrawer';
import AppDataContext from './contexts/appDataContext';
import {DarkModeColors, LightModeColors} from './styles/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import io from 'socket.io-client';

const Drawer = createDrawerNavigator();
const styles = StyleSheet.create(
  {
    container: {
      flex: 1,
    },
  }
)
const App = () => {

  // State and Objects supporting AppDataContext
  const storeUserInfo = async(token, id) => {
    try {
      console.log('Saving...');
      console.log(token);
      console.log(id);
      await AsyncStorage.setItem('@token', token);
      await AsyncStorage.setItem('@user_id', id);

    } catch(e) {
      console.error(e);
    }
  }

  const loadUserInfo = async() => {
    try {
      console.log('Loading...');
      const token = await AsyncStorage.getItem('@token');
      const id = await AsyncStorage.getItem('@user_id');
      console.log('ID: ' + id);
      console.log('Token: ' + token);
      if (id != 'none' && token != 'none' && id != '' && token != '' && id != null && token != null) {
        setUserID(id);
        setAuthToken(token);
        setLoggedIn(true);
        triggerRefresh(new Date());
      }
    } catch(e) {
      console.error(e);
    }
  }

  const loadGroupsAndMessages = async() => {
    try {
      console.log('Attempting to fetch groups + Messages...')
      let response = await fetch('http://localhost:3001/messages/all', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: email,
          token: authToken,
        })
      });
      let json = await response.json();
      //console.log(JSON.stringify(json));
      if (json.success == true){
        //setThreads(json.threads);
        setGroups(json.results)
        console.log('Successfully fetched groups + messages!')
      } else {
        console.log('Failed to fetch groups + messages');
      }
    } catch (error) {
      console.error(error);
    }
  }

  const establishSocketConnection = () => {
    if (loggedIn) {
      console.log('Attempting to establish socket connection...');
      let temp_socket = io('http://127.0.0.1:3001');
      temp_socket.on('connection', msg => {
        temp_socket.emit('introduction', {username: email, token: authToken})
      })

      temp_socket.on('introduction', msg => {
        console.log(JSON.stringify(msg));
      })

      temp_socket.on('message', msg => {
        console.log(JSON.stringify(msg));
        // Add Message to Proper Threads Here
        handleReceiveMessage(msg);
      })

      setSocket(temp_socket);
      console.log('The socket connection has been established');
    }else {
      console.log('Not establishing connection since user is not signed in');
    }
  }

  const handleSocketConnectionAndLoadGroups = async () => {
    await loadGroupsAndMessages();
    await establishSocketConnection();
  }

  const handleReceiveMessage = (msg) => {
    console.log('Attempting to handle message...');
    // We need to get the group id from the msg,
    let tempGroups = groups;

    let group_id = msg.group;

    for (let i = 0; i < tempGroups.length; i++) {
      console.log('Comparing ' + group_id + ' to ' + tempGroups[i].group_id);
      if (group_id == tempGroups[i].group._id ) {
        tempGroups[i].messages.push(msg);
        setGroups([...tempGroups]);
        break;
      }
    }
    console.log('handled message');

    // Then we need to push the new message on the thread of messages
  }

  const [displayName, setDisplayName] = useState(null);
  const [email, setEmail] = useState(null);
  const [authToken, setAuthToken] = useState(null);
  const [userID, setUserID] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [trigger, triggerRefresh] = useState(true);

  const [socket, setSocket] = useState(null);
  const [groups, setGroups] = useState([]);
  const [initialLoad, setInitialLoad] = useState(false);


  const appData = {
    displayName: displayName,
    setDisplayName: setDisplayName,
    email: email,
    setEmail: setEmail,
    authToken: authToken,
    setAuthToken: setAuthToken,
    loggedIn: loggedIn,
    setLoggedIn: setLoggedIn,
    triggerRefresh: triggerRefresh,
    trigger: trigger,
    userID: userID,
    setUserID: setUserID,
    storeUserInfo: storeUserInfo,
    loadUserInfo: loadUserInfo,
    socket: socket,
    setSocket: setSocket,
    groups: groups,
    setGroups: setGroups,
  }

  // Loads startup user info for mobile users
  useEffect(() => {
    loadUserInfo();

  },[]);


  useEffect(() => {
    if (loggedIn) {
      loadGroupsAndMessages();
      //establishSocketConnection();
      //handleSocketConnectionAndLoadGroups();
    }
  }, [loggedIn])

  useEffect(() => {
    if (loggedIn) {
      establishSocketConnection();
    }
  }, [groups])

  return (
    <AppDataContext.Provider value={appData}>
      <SafeAreaProvider style={styles.container}>
        <View style={styles.container}>
          <SafeAreaView style={ styles.container }>
            <NavigationContainer>
              <Drawer.Navigator 
                initialRouteName={loggedIn ? 'Activity' : 'Account'}
                drawerStyle={{ 
                  backgroundColor: LightModeColors.MenuBackground,


                }}
                drawerContentOptions={{
                  activeTintColor: LightModeColors.MenuForegroundFocused,
                  inactiveTintColor: LightModeColors.MenuForeground,
                }}
              >
                {loggedIn && <Drawer.Screen name="Activity" component={Activity} />}
                {loggedIn && <Drawer.Screen name="Diet" component={Diet} />}
                {loggedIn && <Drawer.Screen name="Social" component={Social}/>}
                <Drawer.Screen name="Account" component={Account} />
              </Drawer.Navigator>
            </NavigationContainer>
          </SafeAreaView>
        </View>
      </SafeAreaProvider>
    </AppDataContext.Provider>
  );

  // {loggedIn && <Drawer.Screen name="Settings" component={Settings} />}
}

export default App;

/* Drawer to be added later.
<Drawer.Screen name="Diet" component={Diet} />
<Drawer.Screen name="Health" component={Health} />
<Drawer.Screen name="Social" component={Social} />
<Drawer.Screen name="Account" component={Account} />
*/