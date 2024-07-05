import * as React from "react";
import { Dimensions, ScrollView, StyleSheet, Text, View } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import InsurancePlanCard from "./InsurancePlanCard";
import { useGetPlansByCategoryIdQuery } from "../../redux/slices/plansApiSlice";
import { Spinner } from "@gluestack-ui/themed";
import { useDispatch, useSelector } from "react-redux";
import { selectCategoryId } from "../../redux/slices/applySlice";

export default function InsurancePlanListScreen() {
  const categoryId = useSelector(selectCategoryId);
  const {
    data: insurancePlans,
    error,
    isLoading,
  } = useGetPlansByCategoryIdQuery(categoryId || 1);

  const width = Dimensions.get("window").width - 40;
  const height = Dimensions.get("window").height - 200;

  console.log("\n\n\n\n");
  console.log("\n\n\n\n");
  console.log("\n\n\n\n");
  console.log("\n\n\n\n");
  console.log("insurancePlans>>>>>>>>", insurancePlans);
  console.log("\n\n\n\n");
  console.log("\n\n\n\n");
  console.log("\n\n\n\n");
  console.log("error>>>>>>>>", error);
  console.log("\n\n\n\n");
  console.log("\n\n\n\n");
  console.log("\n\n\n\n");
  console.log("\n\n\n\n");
  console.log("\n\n\n\n");
  console.log("\n\n\n\n");
  console.log("isLoading>>>>>>>>", isLoading);

  //error>>>>>>>> {"data": {"message": "An error occurred while retrieving insurance plans.", "statusCode": 500}, "status": 500}

  if (isLoading) return <Spinner color={"#000"} size={"large"} />;
  if (error?.data?.message) return <Text>{error?.data?.message}</Text>;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Carousel
        // loop
        width={width}
        // height={height}
        // autoPlay={true}
        data={insurancePlans}
        scrollAnimationDuration={1000}
        onSnapToItem={(index) => console.log("current index:", index)}
        renderItem={({ index }) => (
          <ScrollView>
            <InsurancePlanCard item={insurancePlans[index]} />
          </ScrollView>
        )}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 50,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
