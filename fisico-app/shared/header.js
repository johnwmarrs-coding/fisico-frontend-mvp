import { useLinkProps } from '@react-navigation/native';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import { withSafeAreaInsets } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function Header(props) {
    return (
        <View style={styles.header}>
            <View>
                <Ionicons onPress={props.toggleDrawer} name="menu-outline" size={30}></Ionicons>
            </View>
            <View>
                <Text style={styles.headerText}>{props.title}</Text>
            </View>
            <View>
                <Ionicons name="chatbubble-outline" size={30}></Ionicons>
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
        backgroundColor: 'white'
    },
    headerText: {
        fontWeight: 'bold',
        fontSize: 20,
        color: '#333',
        letterSpacing: 1,
    }, 

});