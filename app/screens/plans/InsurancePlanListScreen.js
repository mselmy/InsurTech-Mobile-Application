import * as React from "react";
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  View,
} from "react-native";
import Carousel from "react-native-reanimated-carousel";
import InsurancePlanCard from "./InsurancePlanCard";
import { useGetPlansByCategoryIdQuery } from "../../redux/slices/plansApiSlice";
import { Spinner } from "@gluestack-ui/themed";
import { useDispatch, useSelector } from "react-redux";
import { selectCategoryId } from "../../redux/slices/applySlice";
import { FadeInRight, useSharedValue } from "react-native-reanimated";

export default function InsurancePlanListScreen() {
  const categoryId = useSelector(selectCategoryId);
  const {
    data: insurancePlans,
    error,
    isLoading,
  } = useGetPlansByCategoryIdQuery(categoryId || 1);

  const width = Dimensions.get("window").width - 40;
  const height = Dimensions.get("window").height - 200;
  const [mode, setMode] = React.useState("horizontal-stack");
  const [snapDirection, setSnapDirection] = React.useState("left");
  const [pagingEnabled, setPagingEnabled] = React.useState(true);
  const [snapEnabled, setSnapEnabled] = React.useState(true);
  const [loop, setLoop] = React.useState(true);
  const [autoPlay, setAutoPlay] = React.useState(false);
  const [autoPlayReverse, setAutoPlayReverse] = React.useState(false);
  const viewCount = insurancePlans?.length || 0;
  const progress = useSharedValue(0);
  const [isVertical, setIsVertical] = React.useState(false);
  const [currentPlan, setCurrentPlan] = React.useState(0);

  if (isLoading) return <Spinner color={"#000"} size={"large"} />;
  if (error?.data?.message) return <Text>{error?.data?.message}</Text>;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Carousel
        // loop
        width={width}
        // height={height}
        mode={mode}
        snapDirection={snapDirection}
        pagingEnabled={pagingEnabled}
        snapEnabled={snapEnabled}
        loop={loop}
        autoPlay={autoPlay}
        autoPlayReverse={autoPlayReverse}
        // autoPlayInterval={2000}
        data={insurancePlans}
        modeConfig={{
          snapDirection,
          stackInterval: mode === "vertical-stack" ? 8 : 18,
        }}
        customConfig={() => ({ type: "positive", viewCount })}
        // scrollAnimationDuration={1000}
        onSnapToItem={(index) => setCurrentPlan(index)}
        renderItem={({ index }) => (
          <ScrollView>
            <InsurancePlanCard item={insurancePlans[index]} />
          </ScrollView>
        )}
      />
      <View style={{ flexDirection: "row", justifyContent: "center" }}>
        {insurancePlans.map((_, index) => (
          <View
            key={index}
            style={{
              width: 8,
              height: 8,
              borderRadius: 4,
              backgroundColor: index === currentPlan ? "#000" : "#ccc",
              marginHorizontal: 4,
            }}
          />
        ))}
      </View>
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
