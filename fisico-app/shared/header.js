import { useLinkProps } from '@react-navigation/native';
import React, {useContext} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import { withSafeAreaInsets } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ThemeContext from '../contexts/themeContext';
import { DarkModeColors, LightModeColors } from '../styles/colors';

export default function Header(props) {
    const themeContext = useContext(ThemeContext);
    return (
        <View style={themeContext.darkMode ? darkStyles.header : styles.header}>
            <View>
                <Ionicons onPress={props.toggleDrawer} name="menu-outline" size={30} style={themeContext.darkMode ? darkStyles.icon : styles.icon}></Ionicons>
            </View>
            <View>
                <Text style={themeContext.darkMode ? darkStyles.headerText : styles.headerText}>{props.title}</Text>
            </View>
            <View>
                <Ionicons name="chatbubble-outline" size={30} style={themeContext.darkMode ? darkStyles.icon : styles.icon}></Ionicons>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        backgroundColor: LightModeColors.MenuBackground
    },
    headerText: {
        fontWeight: 'bold',
        fontSize: 20,
        color: LightModeColors.MenuForeground,
        letterSpacing: 1,
    }, 
    icon: {
        color: LightModeColors.MenuForeground,
    }

});

const darkStyles = StyleSheet.create({
    header: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        backgroundColor: DarkModeColors.MenuBackground
    },
    headerText: {
        fontWeight: 'bold',
        fontSize: 20,
        color: DarkModeColors.MenuForeground,
        letterSpacing: 1,
    }, 
    icon: {
        color: DarkModeColors.MenuForeground,
    }

});