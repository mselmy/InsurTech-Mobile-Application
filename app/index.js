import { StyleSheet, Text, View } from "react-native";
import React from "react";
import LoginScreen from "./screens/auth/loginScreen";
import HomeScreen from "./screens/home/HomeScreen";
import RegisterScreen from "./screens/auth/registerScreen";
import EmailVerificationScreen from "./screens/auth/EmailVerificationScreen";
import QuestionList from "./screens/questions/QuestionListScreen";

const IndexScreen = () => {
  return <LoginScreen />;
};
export default IndexScreen;

const styles = StyleSheet.create({});
