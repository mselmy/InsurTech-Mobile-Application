import React, { useEffect } from "react";
import { TextInput, View, StyleSheet, Text, ScrollView } from "react-native";
import { Formik } from "formik";
import colors from "../../common/colors";

import * as Yup from "yup";
import { useResendConfirmationEmailMutation } from "../../redux/slices/authEndpoints";
import { router } from "expo-router";
import { Button, Spinner } from "@gluestack-ui/themed";
import { ButtonText } from "@gluestack-ui/themed";
import { useSnackbar } from "../../hooks/useSnackbar";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Please enter a valid email")
    .required("Email is required"),
});
export default function EmailVerificationScreen() {
  const [resendConfirmationEmail, { data, error, isLoading }] =
    useResendConfirmationEmailMutation();

  const { setSnackbar } = useSnackbar();

  console.log("error=>>>>>>>", error);
  console.log("data=>>>>>>>", data);

  useEffect(() => {
    if (error?.data?.statusCode === 404) {
      setSnackbar({
        visible: true,
        message: "User not found, please enter a valid email",
        type: "error",
        action: {
          label: "Sign Up",
          onPress: () => {
            router.replace("/screens/auth/registerScreen");
          },
        },
      });
    } else if (error?.data?.statusCode === 500) {
      console.log("error", error);
      setSnackbar({
        visible: true,
        message: "Error in sending confirmation email, please try again",
        type: "error",
      });
    }

    if (data) {
      setSnackbar({
        message: "Confirmation email sent successfully",
        type: "success",
        action: {
          label: "Login",
          onPress: () => {
            router.replace("/screens/auth/loginScreen");
          },
        },
      });
    }
  }, [data, error]);

  return (
    <View>
      <Formik
        initialValues={{ email: "" }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          const { email } = values;
          console.log("email", email);
          resendConfirmationEmail(email);
        }}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          isValid,
          touched,
        }) => (
          <ScrollView>
            <View style={styles.container}>
              <Text style={styles.header}> Email Verification</Text>
              <Text style={styles.subHeader}>
                Enter your email to resend the confirmation email
              </Text>
              <TextInput
                style={styles.input}
                placeholder="Email"
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                value={values.email}
              />
              {errors.email && touched.email && (
                <Text style={styles.errorText}>{errors.email}</Text>
              )}

              <Button
                title="Resend Confirmation Email"
                style={
                  styles[isValid && !isLoading ? "button" : "buttonDisabled"]
                }
                onPress={handleSubmit}
                disabled={!isValid || isLoading}
              >
                {isLoading ? (
                  <Spinner size="large" color={colors.gray700} />
                ) : (
                  <ButtonText fontWeight="$medium" fontSize="$md">
                    Resend Confirmation Email
                  </ButtonText>
                )}
              </Button>
            </View>
          </ScrollView>
        )}
      </Formik>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 25,
    marginHorizontal: 20,
    marginTop: 10,
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    color: colors.primary,
  },
  subHeader: {
    fontSize: 14,
    color: colors.black,
    marginTop: 5,
    marginBottom: 20,
  },
  inputContainer: {
    marginVertical: 16,
  },
  input: {
    width: "100%",
    height: 50,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: colors.primaryDark,
    marginBottom: 10,
    paddingHorizontal: 5,
    fontSize: 16,
    placeholderTextColor: colors.gray600,
  },
  inputText: {
    color: colors.primaryDark,
    fontSize: 18,
    marginBottom: 10,
    fontWeight: "bold",
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginBottom: 10,
  },
  button: {
    width: "100%",
    height: 35,
    borderRadius: 3,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  //button when disabled state is true
  buttonDisabled: {
    width: "100%",
    height: 35,
    borderRadius: 3,
    backgroundColor: colors.gray400,
    justifyContent: "center",
    alignItems: "center",
  },

  animation: {
    width: 400,
    height: 400,
  },
});
