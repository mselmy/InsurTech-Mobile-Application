import React from 'react';
import { Stack } from 'expo-router';
import { Provider } from 'react-redux';
import store from './redux/store';

const _layout = () => {
    return (
        <Provider store={store}>
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
        </Provider>
    );
};

export default _layout;
