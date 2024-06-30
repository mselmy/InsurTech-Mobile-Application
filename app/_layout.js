import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const _layout = () => {
return (
    <Stack styles={styles.stackStyle} initialRouteName='screens/auth/loginScreen'>
            <Stack.Screen
                    name="index"
                    options={{
                            headerTitle: "Home",
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
)
}

export default _layout

const styles = StyleSheet.create({
    stackStyle: {
        backgroundColor: "#1c9c7c",
        color: "#1c9c7c"
    },
})