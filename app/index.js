import { StyleSheet, Text, View } from "react-native";
import React from "react";
import LoginScreen from "./screens/auth/loginScreen";
import HomeScreen from "./screens/home/HomeScreen";
import RegisterScreen from "./screens/auth/registerScreen";
import EmailVerificationScreen from "./screens/auth/EmailVerificationScreen";

const IndexScreen = () => {
  return <EmailVerificationScreen />;
};
export default IndexScreen;

const styles = StyleSheet.create({});
