import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import colors from "../../common/colors";
// import greeting from "../../../assets/images/greeting-woman.png";

export default function GreetingComponent() {
  function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }
  const messages = [
    "Nice job! Welcome to your trusty website",
    "Great job! You're doing awesome",
    "You're doing great! Keep up the good work",
    "You're doing amazing! Keep it up",
    "You're doing fantastic! Keep up the good work",
  ];
  return (
    <View style={styles.container}>
      <View style={styles.userImgContainer}>
        <Image
          source={require("../../../assets/greeting-woman.png")}
          style={styles.userImg}
        />
      </View>
      <View style={styles.greeting}>
        <Text style={styles.greetingText}>
          {messages[getRandomInt(messages.length)]}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  userImgContainer: {
    borderRadius: 100,
    height: 30,
    width: 30,
    overflow: "hidden",
  },
  userImg: {
    height: "100%",
    width: "100%",
  },
  greeting: {
    marginLeft: 16,
  },
  greetingText: {
    color: colors.black,
    fontSize: 14,
    fontWeight: "500",
  },
});
