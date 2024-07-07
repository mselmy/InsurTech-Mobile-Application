// app/CongratulationsScreen.js
import React, { useRef } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import LottieView from "lottie-react-native";
import { Button } from "@gluestack-ui/themed";

const CongratulationsScreen = () => {
  const router = useRouter();
  const animationRef = useRef(null);

  const handleAnimationFinish = () => {
    if (animationRef.current) {
      animationRef.current.play(180, 180);
    }
  };

  return (
    <View style={styles.container}>
      <LottieView
        ref={animationRef}
        source={require("../../../assets/animation/Congratulations.json")}
        autoPlay
        loop={false}
        speed={0.5}
        onAnimationFinish={handleAnimationFinish}
        style={styles.lottie}
      />

      <Text style={styles.message}>
        You have completed the request successfully.
      </Text>
      <Button
        title="Go Home"
        bg="$darkBlue600"
        p="$3"
        style={styles.button}
        onPress={() => router.replace("screens/customNavigator")}
      >
        <Text style={styles.text}>Go Home</Text>
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  message: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 20,
  },
  button: {
    width: "80%",
    height: 70,
    borderRadius: 15,
    backgroundColor: "#2acaac",
    justifyContent: "center",
    alignItems: "center",
  },
  lottie: {
    width: "100%",
    height: 400,
  },
  text: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },
});

export default CongratulationsScreen;
