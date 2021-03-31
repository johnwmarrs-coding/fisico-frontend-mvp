import 'react-native-gesture-handler'
import React, {useState} from 'react';
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

const Drawer = createDrawerNavigator();
const styles = StyleSheet.create(
  {
    container: {
      flex: 1,
    },
  }
)
const App = () => {
  // State and Objects supporting ThemeContext
  const [darkMode, setDarkMode] = useState(false);
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  }

  // State and Objects supporting AppDataContext
  const [displayName, setDisplayName] = useState(null);
  const [email, setEmail] = useState(null);
  const [authToken, setAuthToken] = useState(null);
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
  }

  return (
    <AppDataContext.Provider value={appData}>
      <SafeAreaProvider style={styles.container}>
        <SafeAreaView style={ styles.container }>
          <NavigationContainer>
            <Drawer.Navigator 
              drawerStyle={{ 
                backgroundColor: darkMode ? DarkModeColors.MenuBackground : LightModeColors.MenuBackground,

              }}
              drawerContentOptions={{
                activeTintColor: darkMode ? DarkModeColors.MenuForegroundFocused : LightModeColors.MenuForegroundFocused,
                inactiveTintColor: darkMode ? DarkModeColors.MenuForeground : LightModeColors.MenuForeground,
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