import * as React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { MaterialCommunityIcons } from 'react-native-vector-icons';
import TestScreen from './testScreen';
import HomeScreen from './home/HomeScreen';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Article from './article/Article';
import UserProfile from './userProfile/UserProfile';

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
                name="Articles"
                component={Article}
                options={{
                    tabBarLabel: 'Articles',
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="newspaper" color={color} size={26} />
                    ),
                }}
            />
            <Tab.Screen
                name="Profile"
                component={UserProfile}
                options={{
                    tabBarLabel: 'Profile',
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="account" color={color} size={26} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}

export default function CustomNavigator() {
    return (
        <NavigationContainer independent={true}>
            <SafeAreaProvider>
                <MyTabs />
            </SafeAreaProvider>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({});
