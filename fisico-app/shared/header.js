import { useLinkProps } from '@react-navigation/native';
import React, {useContext} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import { withSafeAreaInsets } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AppDataContext from '../contexts/appDataContext';
import { DarkModeColors, LightModeColors } from '../styles/colors';
import { Button } from 'react-native-paper';

export default function Header(props) {
    const appDataContext = useContext(AppDataContext);
    return (
        <View style={styles.header}>
            
            <View style={styles.column}>
                <Ionicons onPress={props.toggleDrawer} name="menu-outline" size={30} style={ styles.iconStart}></Ionicons>
            </View>
            
            <View style={styles.column}>
                <Text style={ styles.headerText}>{props.title}</Text>
            </View>
            <View style={styles.column}>
            {
                appDataContext.loggedIn ?
                <Ionicons name="chatbubble-outline" size={30} style={styles.iconEnd}></Ionicons>
                : <Button mode="text" style={{alignSelf: 'flex-end'}} onPress={props.openSignin} color={LightModeColors.MenuForeground}>Sign In</Button>
            }
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
        textAlign: 'center',
    }, 
    iconStart: {
        color: LightModeColors.MenuForeground,
    },
    iconEnd: {
        color: LightModeColors.MenuForeground,
        alignSelf: 'flex-end',
    },
    column: {
        flex: 1,
    }

});
