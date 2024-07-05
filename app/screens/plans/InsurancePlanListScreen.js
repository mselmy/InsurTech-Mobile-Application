import * as React from "react";
import { Dimensions, ScrollView, StyleSheet, Text, View } from "react-native";
import Carousel from "react-native-reanimated-carousel";

export default function InsurancePlanListScreen() {
  const width = Dimensions.get("window").width - 40;
  const height = Dimensions.get("window").height - 200;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Carousel
        // loop

        width={width}
        height={height}
        // autoPlay={true}
        data={[...new Array(6).keys()]}
        scrollAnimationDuration={1000}
        onSnapToItem={(index) => console.log("current index:", index)}
        renderItem={({ index }) => (
          <View
            style={{
              // flex: 1,
              borderWidth: 1,
              borderColor: "red",
              justifyContent: "center",
              height: height,
            }}
          >
            <Text style={{ textAlign: "center", fontSize: 30 }}>{index}</Text>
          </View>
        )}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
