import React from "react";
import {
  Button,
  TextInput,
  View,
  StyleSheet,
  Text,
  ScrollView,
} from "react-native";
import { Formik } from "formik";
import colors from "../../common/colors";

import * as Yup from "yup";
import { useRegisterUserMutation } from "../../redux/slices/authApiSlice";
import { router } from "expo-router";

export default function EmailVerificationScreen() {
  return (
    <View>
      <Text> Email Verification Screen </Text>
    </View>
  );
}
