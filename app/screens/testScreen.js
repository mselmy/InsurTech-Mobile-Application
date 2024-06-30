import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useSelector } from 'react-redux';
import { SafeAreaView } from "react-native-safe-area-context";


const TestScreen = () => {
    const { user } = useSelector((state) => state.user);
    console.log(user);
    return (
        
        <SafeAreaView>
            <Text>{user.id}</Text>
            <Text>{user.name}</Text>
            <Text>{user.email}</Text>
            <Text>{user.token}</Text>
        </SafeAreaView>
    );
};
export default TestScreen;

const styles = StyleSheet.create({});
