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
import ThemeContext from './contexts/themeContext';
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
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  }

  const themeData = {
    darkMode: darkMode,
    toggleDarkMode: toggleDarkMode,
  }
  return (
    <ThemeContext.Provider value={themeData}>
      <SafeAreaProvider style={styles.container}>
        <SafeAreaView style={ styles.container }>
          <NavigationContainer>
            <Drawer.Navigator initialRouteName="Activity" 
              drawerStyle={{
                backgroundColor: darkMode ? DarkModeColors.MenuBackground : LightModeColors.MenuBackground,

              }}
              drawerContentOptions={{
                activeTintColor: darkMode ? DarkModeColors.MenuForegroundFocused : LightModeColors.MenuForegroundFocused,
                inactiveTintColor: darkMode ? DarkModeColors.MenuForeground : LightModeColors.MenuForeground,
              }}
            >
              <Drawer.Screen name="Activity" component={Activity} />
              <Drawer.Screen name="Settings" component={Settings} />
            </Drawer.Navigator>
          </NavigationContainer>
        </SafeAreaView>
      </SafeAreaProvider>
    </ThemeContext.Provider>
  );
}

export default App;

/* Drawer to be added later.
<Drawer.Screen name="Diet" component={Diet} />
<Drawer.Screen name="Health" component={Health} />
<Drawer.Screen name="Social" component={Social} />
<Drawer.Screen name="Account" component={Account} />
*/