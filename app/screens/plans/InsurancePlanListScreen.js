import * as React from "react";
import { Dimensions, ScrollView, StyleSheet, Text, View } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import InsurancePlanCard from "./InsurancePlanCard";
import { useGetPlansByCategoryIdQuery } from "../../redux/slices/plansApiSlice";
import { Spinner } from "@gluestack-ui/themed";
import { useDispatch, useSelector } from "react-redux";
import { selectCategoryId } from "../../redux/slices/applySlice";
const insurancePlans = [
  {
    level: 0,
    yearlyCoverage: 5000,
    quotation: 500,
    hospitalizationAndSurgery: 100000,
    clinicsCoverage: 50000,
    opticalCoverage: 5000,
    dentalCoverage: 5000,
  },
  {
    level: 1,
    yearlyCoverage: 10000,
    quotation: 1000,
    hospitalizationAndSurgery: 200000,
    clinicsCoverage: 100000,
    opticalCoverage: 10000,
    dentalCoverage: 10000,
  },
  {
    level: 2,
    yearlyCoverage: 20000,
    quotation: 2000,
    hospitalizationAndSurgery: 300000,
    clinicsCoverage: 200000,
    opticalCoverage: 20000,
    dentalCoverage: 20000,
  },
];
//[{"category": "HealthInsurance", "clinicsCoverage": 1, "company": "string", "dentalCoverage": 1, "hospitalizationAndSurgery": 1, "id": 2, "level": 1, "medicalNetwork": "1", "numberOfUsers": 0, "opticalCoverage": 1, "quotation": 1, "yearlyCoverage": 1}, {"category": "HealthInsurance", "clinicsCoverage": 99, "company": "company", "dentalCoverage": 99, "hospitalizationAndSurgery": 99, "id": 2007, "level": 0, "medicalNetwork": "99", "numberOfUsers": 0, "opticalCoverage": 99, "quotation": 999, "yearlyCoverage": 99}, {"category": "HealthInsurance", "clinicsCoverage": 44, "company": "company", "dentalCoverage": 44, "hospitalizationAndSurgery": 44, "id": 2009, "level": 0, "medicalNetwork": "44", "numberOfUsers": 0, "opticalCoverage": 44, "quotation": 44, "yearlyCoverage": 44}]
//[{"category": "MotorInsurance", "company": "string", "id": 1003, "legalExpenses": 1000, "level": 0, "numberOfUsers": 0, "ownDamage": 1000, "personalAccident": 1100, "quotation": 100000, "theft": 1000, "thirdPartyLiability": 1000, "yearlyCoverage": 10}, {"category": "MotorInsurance", "company": "string", "id": 1004, "legalExpenses": 1000, "level": 0, "numberOfUsers": 0, "ownDamage": 1000, "personalAccident": 1000, "quotation": 100000, "theft": 1000, "thirdPartyLiability": 1000, "yearlyCoverage": 5}, {"category": "MotorInsurance", "company": "string", "id": 1005, "legalExpenses": 1000, "level": 0, "numberOfUsers": 0, "ownDamage": 1000, "personalAccident": 1100, "quotation": 100000, "theft": 1000, "thirdPartyLiability": 1000, "yearlyCoverage": 10}, {"category": "MotorInsurance", "company": "string", "id": 1006, "legalExpenses": 1000, "level": 1, "numberOfUsers": 0, "ownDamage": 1000, "personalAccident": 1100, "quotation": 200000, "theft": 1000, "thirdPartyLiability": 1000, "yearlyCoverage": 10}, {"category": "MotorInsurance", "company": "string", "id": 1007, "legalExpenses": 1000, "level": 2, "numberOfUsers": 0, "ownDamage": 1000, "personalAccident": 1100, "quotation": 500000, "theft": 1000, "thirdPartyLiability": 1000, "yearlyCoverage": 10}]

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
