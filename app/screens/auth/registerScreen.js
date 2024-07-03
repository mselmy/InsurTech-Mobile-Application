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
  birthDate: Yup.string()
    .required("Birthdate is required")
    .matches(
      /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/,
      "Birthdate must be in the format of dd/mm/yyyy"
    ),
  nationalId: Yup.string()
    .matches(/^\d{14}$/, "National ID must be 14 digits")
    .required("National ID is required"),
  phoneNumber: Yup.string()
    .matches(/^01(0|1|2|5)[0-9]{8}$/, "Phone number is invalid")
    .required("Phone number is required"),
});

const RegisterScreen = () => {
  const [registerUser, { data, error, isLoading }] = useRegisterUserMutation();

  console.log("error", error);
  // console.log(isLoading);
  //error {"data": {"message": "Error in sending confirmation email",
  if (error && error?.data?.message === "Error in sending confirmation email") {
    router.push("/screens/auth/EmailVerificationScreen");
  }
  function handleSubmitForm(userData) {
    try {
      registerUser(userData);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <ScrollView style={styles.container}>
      <Formik
        validationSchema={validationSchema}
        initialValues={{
          emailAddress: "",
          password: "",
          name: "",
          userName: "",
          birthDate: "",
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
            {errors.email && (
              <Text style={styles.errorText}>{errors.email}</Text>
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
              value={values.birthDate}
              placeholder="dd/mm/yyyy"
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

            <Text style={styles.errorText}>
              {error && "An error occurred. Please try again."}
            </Text>

            <Button
              style={styles.button}
              onPress={handleSubmit}
              title="Signup"
              disabled={!isValid || isLoading}
            />
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
  },
  button: {
    width: "80%",
    height: 70,
    borderRadius: 15,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  animation: {
    width: 400,
    height: 400,
  },
});
