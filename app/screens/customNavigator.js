import * as React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { MaterialCommunityIcons } from 'react-native-vector-icons';
import TestScreen from './testScreen';
import HomeScreen from './home/HomeScreen';

const Tab = createMaterialBottomTabNavigator();

function MyTabs() {
    return (
        <Tab.Navigator
            initialRouteName="Home"
            activeColor="#2acaac"
            labelStyle={{ fontSize: 12 }}
            style={{ backgroundColor: 'black' }}
        >
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="home" color={color} size={26} />
                    ),
                }}
            />
            <Tab.Screen
                name="Settings"
                component={TestScreen}
                options={{
                    tabBarLabel: 'Settings',
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="test-tube" color={color} size={26} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}

export default function customNavigator() {
    return (
        <NavigationContainer independent={true}>
            <MyTabs />
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({});
