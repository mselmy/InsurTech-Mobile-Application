import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Stack } from 'expo-router';

const _layout = () => {
    return (
        <Stack 
            initialRouteName="screens/auth/loginScreen"
            screenOptions={{
                headerStyle: {
                    backgroundColor: "#2acaac",
                },
                headerTintColor: "#fff",
                headerTitleStyle: {
                    fontWeight: "bold",
                },
            }}
            >
            <Stack.Screen
                name="index"
                options={{
                    headerTitle: "Login",
                    headerTitleAlign: "center",
                }}
            />
            <Stack.Screen
                name="screens/testScreen"
                options={{
                    headerTitle: "Test",
                    headerTitleAlign: "center",
                }}
            />
            <Stack.Screen
                name="screens/auth/loginScreen"
                options={{
                    headerTitle: "Login",
                    headerTitleAlign: "center",
                }}
            />
        </Stack>
    );
};

export default _layout;
