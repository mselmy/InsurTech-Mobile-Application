import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useSelector } from 'react-redux';


const TestScreen = () => {
    const { user } = useSelector((state) => state.user);
    console.log(user);
    return (
        <View>
            <Text>{user.id}</Text>
            <Text>{user.name}</Text>
            <Text>{user.email}</Text>
            <Text>{user.token}</Text>
        </View>
    );
};
export default TestScreen;

const styles = StyleSheet.create({});
