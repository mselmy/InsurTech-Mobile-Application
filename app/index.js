import { Button, StyleSheet, Text, View } from "react-native";
import React from "react";
import { router } from "expo-router";


const HomeScreen = () => {
    return (
        <View>
        <Text>Home Screen</Text>
        <Button title="Go to Test Screen" onPress={() => router.push("screens/testScreen")} />
        </View>
    );
};
export default HomeScreen;

const styles = StyleSheet.create({});