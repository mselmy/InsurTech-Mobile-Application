import React from "react";
import {
  Button,
  TextInput,
  View,
  StyleSheet,
  SafeAreaView,
  Text,
  ScrollView,
} from "react-native";
import { Formik } from "formik";
import colors from "../../common/colors";

import * as Yup from "yup";
import { useRegisterUserMutation } from "../../redux/slices/authApiSlice";

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
  name: Yup.string().required("Name is required"),
  userName: Yup.string().required("Username is required"),
  birthDate: Yup.string().required("Birthdate is required"),
  nationalId: Yup.string()
    .matches(/^\d{14}$/, "National ID must be 14 digits")
    .required("National ID is required"),
  phoneNumber: Yup.string()
    .matches(/^01(0|1|2|5)[0-9]{8}$/, "Phone number is invalid")
    .required("Phone number is required"),
});

const RegisterScreen = () => {
  const [registerUser, { data, error, isLoading }] = useRegisterUserMutation();

  console.log("data", data); // "data" is always "undefined"
  console.log("error", error); // "error" is always "undefined
  // console.log(isLoading);
  function handleSubmitForm(userData) {
    try {
      registerUser(userData);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
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
              <Text style={styles.header}>Register</Text>
              <Text style={styles.subHeader}>
                Register to become a member of our community
              </Text>

              <Text style={styles.inputText}>Email: </Text>

              <TextInput
                style={styles.input}
                onChangeText={handleChange("emailAddress")}
                onBlur={handleBlur("emailAddress")}
                value={values.emailAddress}
              />
              {
                // Display error message if email is invalid
                errors.email && (
                  <Text style={styles.errorText}>{errors.email}</Text>
                )
              }

              <Text style={styles.inputText}>Password: </Text>
              <TextInput
                style={styles.input}
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                value={values.password}
              />
              {
                // Display error message if password is invalid
                errors.password && (
                  <Text style={styles.errorText}>{errors.password}</Text>
                )
              }

              <Text style={styles.inputText}>Name: </Text>
              <TextInput
                style={styles.input}
                onChangeText={handleChange("name")}
                onBlur={handleBlur("name")}
                value={values.name}
              />

              {
                // Display error message if name is invalid
                errors.name && (
                  <Text style={styles.errorText}>{errors.name}</Text>
                )
              }

              <Text style={styles.inputText}>Username: </Text>
              <TextInput
                style={styles.input}
                onChangeText={handleChange("userName")}
                onBlur={handleBlur("userName")}
                value={values.userName}
              />
              {
                // Display error message if username is invalid
                errors.userName && (
                  <Text style={styles.errorText}>{errors.userName}</Text>
                )
              }

              <Text style={styles.inputText}>Birthdate: </Text>
              <TextInput
                style={styles.input}
                onChangeText={handleChange("birthDate")}
                onBlur={handleBlur("birthDate")}
                value={values.birthDate}
              />
              {
                // Display error message if birthdate is invalid
                errors.birthDate && (
                  <Text style={styles.errorText}>{errors.birthDate}</Text>
                )
              }

              <Text style={styles.inputText}>National ID: </Text>
              <TextInput
                style={styles.input}
                onChangeText={handleChange("nationalId")}
                onBlur={handleBlur("nationalId")}
                value={values.nationalId}
              />
              {
                // Display error message if national ID is invalid
                errors.nationalId && (
                  <Text style={styles.errorText}>{errors.nationalId}</Text>
                )
              }

              <Text style={styles.inputText}>Phone Number: </Text>
              <TextInput
                style={styles.input}
                onChangeText={handleChange("phoneNumber")}
                onBlur={handleBlur("phoneNumber")}
                value={values.phoneNumber}
              />
              {
                // Display error message if phone number is invalid
                errors.phoneNumber && (
                  <Text style={styles.errorText}>{errors.phoneNumber}</Text>
                )
              }

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
    </SafeAreaView>
  );
};

export default RegisterScreen;
// const styles = StyleSheet.create({});
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 25,
    marginHorizontal: 20,
    marginTop: 50,
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
    borderColor: colors.primary,
    marginBottom: 10,
    paddingHorizontal: 5,
    fontSize: 16,
    placeholderTextColor: colors.gray600,
  },
  inputText: {
    color: colors.primaryLight,
    fontSize: 18,
    marginBottom: 10,
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
