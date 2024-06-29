import { Button, StyleSheet, Text, View } from "react-native";
import React from "react";
import { router } from "expo-router";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAsZLu_kFO-vr48cewpMMhEif6tZh0SOgI",
    authDomain: "insurtech-1.firebaseapp.com",
    projectId: "insurtech-1",
    storageBucket: "insurtech-1.appspot.com",
    messagingSenderId: "468147806967",
    appId: "1:468147806967:web:e2493ee46ab9e7fb5fa9f2",
    measurementId: "G-ZXW6W2EDCT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

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