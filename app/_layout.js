import React from 'react';
import { Stack } from 'expo-router';
import { Provider } from 'react-redux';
import store from './redux/store';
import { GluestackUIProvider} from '../node_modules/@gluestack-ui/themed';
import { config } from '../node_modules/@gluestack-ui/config';


const _layout = () => {
    return (
        <GluestackUIProvider config={config}>
            <Provider store={store}>
                <Stack
                    initialRouteName="screens/home/HomeScreen"
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
                        name="screens/customNavigator"
                        options={{
                            headerTitle: "InsurTech",
                            headerTitleAlign: "center",
                            headerLeft: () => null,
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
        </GluestackUIProvider>
    );
};

export default _layout;
