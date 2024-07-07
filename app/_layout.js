import React from "react";
import { Stack } from "expo-router";
import { Provider } from "react-redux";
import store from "./redux/store";
import { GluestackUIProvider } from "../node_modules/@gluestack-ui/themed";
import { config } from "../node_modules/@gluestack-ui/config";
import { SnackbarProvider } from "./contexts/snackbarContext";

const _layout = () => {
  return (
    <SnackbarProvider>
      <GluestackUIProvider config={config}>
        <Provider store={store}>
          <Stack
            initialRouteName="screens/auth/loginScreen"
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
              name="screens/CustomNavigator"
              options={{
                headerTitle: "InsurTech",
                headerTitleAlign: "center",
                headerLeft: () => null,
              }}
            />
            <Stack.Screen
              name="index"
              options={{
                headerTitle: "Login",
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
              name="screens/auth/registerScreen"
              options={{
                headerTitle: "Register",
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
            <Stack.Screen
              name="screens/auth/EmailVerificationScreen"
              options={{
                headerTitle: "Email Verification",
                headerTitleAlign: "center",
              }}
            />
            <Stack.Screen
              name="screens/questions/QuestionListScreen"
              options={{
                headerTitle: "Questions",
                headerTitleAlign: "center",
              }}
            />
            <Stack.Screen
              name="screens/plans/InsurancePlanListScreen"
              options={{
                headerTitle: "Insurance Plans",
                headerTitleAlign: "center",
              }}
            />
            <Stack.Screen
              name="screens/congratulations/CongratulationsScreen"
              options={{
                headerTitle: "Congratulations",
                headerTitleAlign: "center",
              }}
            />
          </Stack>
        </Provider>
      </GluestackUIProvider>
    </SnackbarProvider>
  );
};

export default _layout;
