import { Button, StyleSheet, Text, View } from "react-native";
import React from "react";
import { router } from "expo-router";
import LoginScreen from "./screens/auth/loginScreen";
import { GluestackUIProvider } from "@gluestack-ui/themed";


const HomeScreen = () => {
    return (
        <GluestackUIProvider>
            <LoginScreen />
        </GluestackUIProvider>
    );
};
export default HomeScreen;

const styles = StyleSheet.create({});