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
      if (id != 'none' && token != 'none') {
        setUserID(id);
        setAuthToken(token);
        setLoggedIn(true);
        triggerRefresh(new Date());
      }
    } catch(e) {
      console.error(e);
    }
  }

  const [displayName, setDisplayName] = useState(null);
  const [email, setEmail] = useState(null);
  const [authToken, setAuthToken] = useState(null);
  const [userID, setUserID] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [trigger, triggerRefresh] = useState(true);

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
  }

  // Loads startup user info for mobile users
  useEffect(() => {
    loadUserInfo();

  },[]);

  return (
    <AppDataContext.Provider value={appData}>
      <SafeAreaProvider style={styles.container}>
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
              {loggedIn && <Drawer.Screen name="Settings" component={Settings} />}
              <Drawer.Screen name="Account" component={Account} />
            </Drawer.Navigator>
          </NavigationContainer>
        </SafeAreaView>
      </SafeAreaProvider>
    </AppDataContext.Provider>
  );
}

export default App;

/* Drawer to be added later.
<Drawer.Screen name="Diet" component={Diet} />
<Drawer.Screen name="Health" component={Health} />
<Drawer.Screen name="Social" component={Social} />
<Drawer.Screen name="Account" component={Account} />
*/