import React, { useEffect, useState } from "react";
import { TextInput, View, StyleSheet, Text, ScrollView } from "react-native";
import { Formik } from "formik";
import colors from "../../common/colors";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";

import * as Yup from "yup";
import { useRegisterUserMutation } from "../../redux/slices/authEndpoints";
import { router } from "expo-router";
import { ButtonText, Spinner, Button, Toast } from "@gluestack-ui/themed";
import { useSnackbar } from "../../hooks/useSnackbar";

// {"data": {"errors": ["The Name field is required.", "The UserName field is required.", "The BirthDate field is required.", "The NationalId field is required.", "The PhoneNumber field is required.", "The EmailAddress field is required."], "message": "Bad Request", "statusCode": 400}, "status": 400}
//{"data": {"errors": ["The field NationalId must match the regular expression '^\\d{14}$'.", "The field PhoneNumber must match the regular expression '^01(0|1|2|5)[0-9]{8}$'.", "The EmailAddress field is required."]
const validationSchema = Yup.object().shape({
  emailAddress: Yup.string()
    .email("Please enter a valid email")
    .required("Email is required"),
  //strong password validation with minimum 8 characters and at least one number and one special character one uppercase letter
  password: Yup.string()
    .matches(
      /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
    )
    .required("Password is required"),
  //name validation at least 3 characters
  name: Yup.string()
    .required("Name is required")
    .min(3, "Name must be at least 3 characters"),
  userName: Yup.string()
    .required("Username is required")
    .min(3, "Username must be at least 3 characters"),
  //this format is for date of birth in the format of dd/mm/yyyy
  // birthDate: Yup.string()
  //   .required("Birthdate is required")
  //   .matches(
  //     /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/,
  //     "Birthdate must be in the format of dd/mm/yyyy"
  //   ),
  nationalId: Yup.string()
    .matches(/^\d{14}$/, "National ID must be 14 digits")
    .required("National ID is required"),
  phoneNumber: Yup.string()
    .matches(/^01(0|1|2|5)[0-9]{8}$/, "Phone number is invalid")
    .required("Phone number is required"),
});

const RegisterScreen = () => {
  const [registerUser, { data, error, isLoading }] = useRegisterUserMutation();

  const { setSnackbar, snackbar } = useSnackbar();

  const maxDate = new Date(
    new Date().setFullYear(new Date().getFullYear() - 18)
  );
  const [birthDate, setBirthDate] = useState(maxDate);

  function handleSubmitForm(userData) {
    try {
      userData.birthDate = birthDate.toISOString().split("T")[0];
      console.log("userData=>>>>>>>", userData); // "userData=>>>>>>> { emailAddress: '
      registerUser(userData);
    } catch (error) {
      console.log(error);
    }
  }

  function showDatePicker() {
    DateTimePickerAndroid.open({
      mode: "date",
      maximumDate: maxDate,
      value: maxDate,
      onChange: (event, selectedDate) => {
        const currentDate = selectedDate || maxDate;
        setBirthDate(currentDate);
      },
    });
  }

  console.log("error=>>>>>>>", error);
  console.log("data=>>>>>>>", data);
  useEffect(() => {
    if (
      error &&
      error?.data?.message === "Error in sending confirmation email"
    ) {
      setSnackbar({
        ...snackbar,
        visible: true,
        message: "Error in sending confirmation email, please try again",
        type: "error",
        action: {
          label: "resend email",
          onPress: () => {
            console.log("Resend email pressed");
            router.push("/screens/auth/EmailVerificationScreen");
          },
        },
      });
    } else if (error) {
      setSnackbar({
        visible: true,
        message: error?.data?.message || "An error occurred, please try again",
        type: "error",
        action: {
          label: "Retry",
          onPress: () => {
            console.log("Retry pressed");
          },
        },
      });
    } else if (error && error?.data?.message === "Email is already taken") {
      setSnackbar({
        ...snackbar,
        visible: true,
        message: "Email is already taken",
        type: "error",
        action: {
          label: "Login",
          onPress: () => {
            console.log("Login pressed");
            router.push("/screens/auth/loginScreen");
          },
        },
      });
    }

    if (data?.status === 200) {
      setSnackbar({
        ...snackbar,
        visible: true,
        message: "User registered successfully, please verify your email",
        type: "success",
        action: {
          label: "Login",
          onPress: () => {
            console.log("Login pressed");
            router.push("/screens/auth/loginScreen");
          },
        },
      });
      router.push("/screens/auth/loginScreen");
    }
  }, [data, error]);

  return (
    <ScrollView style={styles.container}>
      <Formik
        validationSchema={validationSchema}
        initialValues={{
          emailAddress: "",
          password: "",
          name: "",
          userName: "",
          // birthDate: maxDate,
          nationalId: "",
          phoneNumber: "",
        }}
        onSubmit={(values) => {
          console.log(values);
          handleSubmitForm(values);
        }}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
          isValid,
        }) => (
          <View>
            <Text style={styles.inputText}>Email: </Text>
            <TextInput
              style={styles.input}
              onChangeText={handleChange("emailAddress")}
              onBlur={handleBlur("emailAddress")}
              value={values.emailAddress}
              placeholder="Enter your email"
              keyboardType="email-address"
            />
            {errors.emailAddress && (
              <Text style={styles.errorText}>{errors.emailAddress}</Text>
            )}

            <Text style={styles.inputText}>Password: </Text>
            <TextInput
              style={styles.input}
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              value={values.password}
              placeholder="Enter your password"
              secureTextEntry
            />
            {errors.password && (
              <Text style={styles.errorText}>{errors.password}</Text>
            )}

            <Text style={styles.inputText}>Name: </Text>
            <TextInput
              style={styles.input}
              onChangeText={handleChange("name")}
              onBlur={handleBlur("name")}
              value={values.name}
              placeholder="Enter your name"
            />

            {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}

            <Text style={styles.inputText}>Username: </Text>
            <TextInput
              style={styles.input}
              onChangeText={handleChange("userName")}
              onBlur={handleBlur("userName")}
              value={values.userName}
              placeholder="Enter your username"
            />
            {errors.userName && (
              <Text style={styles.errorText}>{errors.userName}</Text>
            )}

            <Text style={styles.inputText}>Birthdate: </Text>
            <TextInput
              style={styles.input}
              onChangeText={handleChange("birthDate")}
              onBlur={handleBlur("birthDate")}
              value={birthDate.toISOString().split("T")[0]}
              placeholder="dd/mm/yyyy"
              onFocus={showDatePicker}
            />
            {errors.birthDate && (
              <Text style={styles.errorText}>{errors.birthDate}</Text>
            )}

            <Text style={styles.inputText}>National ID: </Text>
            <TextInput
              style={styles.input}
              onChangeText={handleChange("nationalId")}
              onBlur={handleBlur("nationalId")}
              value={values.nationalId}
              placeholder="14 digits"
            />
            {errors.nationalId && (
              <Text style={styles.errorText}>{errors.nationalId}</Text>
            )}

            <Text style={styles.inputText}>Phone Number: </Text>
            <TextInput
              style={styles.input}
              onChangeText={handleChange("phoneNumber")}
              onBlur={handleBlur("phoneNumber")}
              value={values.phoneNumber}
              placeholder="01XXXXXXXXX"
            />
            {errors.phoneNumber && (
              <Text style={styles.errorText}>{errors.phoneNumber}</Text>
            )}

            <Button
              title="Register"
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
                  Register
                </ButtonText>
              )}
            </Button>
            <View style={{ alignItems: "center", marginTop: 20 }}>
              <Text style={styles.subHeader}>Already have an account?</Text>
              <Button
                title="Login"
                style={styles.link}
                onPress={() => router.push("/screens/auth/loginScreen")}
              >
                <ButtonText
                  fontWeight="$medium"
                  fontSize="$md"
                  color="$black"
                  textDecorationLine="underline"
                >
                  Login
                </ButtonText>
              </Button>
            </View>
          </View>
        )}
      </Formik>
    </ScrollView>
  );
};

export default RegisterScreen;
// const styles = StyleSheet.create({});
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
  link: {
    justifyContent: "center",
    alignItems: "center",
    textDecorationLine: "underline",
    backgroundColor: "transparent",
    color: colors.primary,
  },
});
