import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import colors from "../../common/colors";
import { useRequestInsurancePlanMutation } from "../../redux/slices/plansApiSlice";
import { useSelector } from "react-redux";
import {
  selectAnswers,
  selectInsuranceId,
} from "../../redux/slices/applySlice";
import { router } from "expo-router";
import { Spinner } from "@gluestack-ui/themed";
import { useSnackbar } from "../../hooks/useSnackbar";

export default function InsurancePlanCard({ item }) {
  const { setSnackbar } = useSnackbar();

  const [
    requestInsurancePlan,
    {
      data: requestInsurancePlanData,
      error: requestInsurancePlanError,
      isLoading: requestInsurancePlanIsLoading,
    },
  ] = useRequestInsurancePlanMutation();
  const answers = useSelector(selectAnswers);

  const [showMore, setShowMore] = useState(false);

  function handleChooseInsurancePlan() {
    requestInsurancePlan({
      insurancePlanId: item.id,
      answers: answers,
    });
  }
  function renderAdditionalDetails() {
    if (item.category === "HealthInsurance") {
      return (
        <>
          {item.medicalNetwork && (
            <View style={styles.optionItem}>
              <Text style={styles.optionText}>Medical Network</Text>
              <Text style={styles.optionValue}>{item.medicalNetwork}</Text>
            </View>
          )}
          {item.clinicsCoverage && (
            <View style={styles.optionItem}>
              <Text style={styles.optionText}>Clinics Coverage</Text>
              <Text style={styles.optionValue}>EGP {item.clinicsCoverage}</Text>
            </View>
          )}
          {item.hospitalizationAndSurgery && (
            <View style={styles.optionItem}>
              <Text style={styles.optionText}>Hospitalization and Surgery</Text>
              <Text style={styles.optionValue}>
                EGP {item.hospitalizationAndSurgery}
              </Text>
            </View>
          )}
          {showMore && item.opticalCoverage && (
            <View style={styles.optionItem}>
              <Text style={styles.optionText}>Optical Coverage</Text>
              <Text style={styles.optionValue}>EGP {item.opticalCoverage}</Text>
            </View>
          )}
          {showMore && item.dentalCoverage && (
            <View style={styles.optionItem}>
              <Text style={styles.optionText}>Dental Coverage</Text>
              <Text style={styles.optionValue}>EGP {item.dentalCoverage}</Text>
            </View>
          )}
        </>
      );
    }

    if (item.category === "HomeInsurance") {
      return (
        <>
          {item.waterDamage && (
            <View style={styles.optionItem}>
              <Text style={styles.optionText}>Water Damage</Text>
              <Text style={styles.optionValue}>EGP {item.waterDamage}</Text>
            </View>
          )}
          {item.glassBreakage && (
            <View style={styles.optionItem}>
              <Text style={styles.optionText}>Glass Breakage</Text>
              <Text style={styles.optionValue}>EGP {item.glassBreakage}</Text>
            </View>
          )}
          {item.naturalHazard && (
            <View style={styles.optionItem}>
              <Text style={styles.optionText}>Natural Hazard</Text>
              <Text style={styles.optionValue}>EGP {item.naturalHazard}</Text>
            </View>
          )}
          {showMore && item.attemptedTheft && (
            <View style={styles.optionItem}>
              <Text style={styles.optionText}>Attempted Theft</Text>
              <Text style={styles.optionValue}>EGP {item.attemptedTheft}</Text>
            </View>
          )}
          {showMore && item.firesAndExplosion && (
            <View style={styles.optionItem}>
              <Text style={styles.optionText}>Fires and Explosion</Text>
              <Text style={styles.optionValue}>
                EGP {item.firesAndExplosion}
              </Text>
            </View>
          )}
        </>
      );
    }

    if (item.category === "MotorInsurance") {
      return (
        <>
          {item.ownDamage && (
            <View style={styles.optionItem}>
              <Text style={styles.optionText}>Own Damage</Text>
              <Text style={styles.optionValue}>EGP {item.ownDamage}</Text>
            </View>
          )}
          {item.legalExpenses && (
            <View style={styles.optionItem}>
              <Text style={styles.optionText}>Legal Expenses</Text>
              <Text style={styles.optionValue}>EGP {item.legalExpenses}</Text>
            </View>
          )}
          {item.personalAccident && (
            <View style={styles.optionItem}>
              <Text style={styles.optionText}>Personal Accident</Text>
              <Text style={styles.optionValue}>
                EGP {item.personalAccident}
              </Text>
            </View>
          )}
          {showMore && item.theft && (
            <View style={styles.optionItem}>
              <Text style={styles.optionText}>Theft</Text>
              <Text style={styles.optionValue}>EGP {item.theft}</Text>
            </View>
          )}
          {showMore && item.thirdPartyLiability && (
            <View style={styles.optionItem}>
              <Text style={styles.optionText}>Third Party Liability</Text>
              <Text style={styles.optionValue}>
                EGP {item.thirdPartyLiability}
              </Text>
            </View>
          )}
        </>
      );
    }

    return null;
  }

  function getInsurancePlanLevelColor(level) {
    return level === 0
      ? colors.basic
      : level === 1
      ? colors.standard
      : colors.premium;
  }
  function getInsurancePlanLevelName(level) {
    return level === 0 ? "Basic" : level === 1 ? "Standard" : "Premium";
  }

  useEffect(() => {
    if (requestInsurancePlanError) {
      setSnackbar({
        visible: true,
        message: requestInsurancePlanError.data?.message,
        type: "error",
      });
    }
    if (requestInsurancePlanData) {
      router.replace("screens/congratulations/CongratulationsScreen");
    }
  }, [requestInsurancePlanData, requestInsurancePlanError]);

  if (requestInsurancePlanIsLoading)
    return <Spinner color={"#000"} size={"large"} />;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View
        style={{
          backgroundColor: getInsurancePlanLevelColor(item.level),
        }}
      >
        <View style={styles.card}>
          <View
            style={[
              styles.companyName,
              {
                borderBottomColor: getInsurancePlanLevelColor(item.level),
                borderBottomWidth: 1,
              },
            ]}
          >
            <Text style={styles.companyNameText}>
              {item.company.length < 15
                ? item.company
                : item.company.slice(0, 15) + "..."}
            </Text>
          </View>
          <View style={styles.title}>
            <Text
              style={[
                styles.titleText,
                {
                  color: getInsurancePlanLevelColor(item.level),
                },
              ]}
            >
              {getInsurancePlanLevelName(item.level)}
            </Text>
          </View>
          <View style={styles.price}>
            <Text style={styles.priceText}>
              EGP {item.yearlyCoverage}{" "}
              <Text style={styles.priceSubText}>/year</Text>
            </Text>
            <Text style={styles.priceSubText}>EGP {item.quotation} /month</Text>
          </View>
          <View style={styles.options}>
            {renderAdditionalDetails()}

            <TouchableOpacity onPress={() => setShowMore(!showMore)}>
              <Text
                style={[
                  styles.moreText,
                  { color: getInsurancePlanLevelColor(item.level) },
                ]}
              >
                {showMore ? "See Less" : "See More"}
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={[
              styles.button,
              { backgroundColor: getInsurancePlanLevelColor(item.level) },
            ]}
            onPress={handleChooseInsurancePlan}
          >
            <Text style={styles.buttonText}>Choose Insurance Plan</Text>
          </TouchableOpacity>
        </View>
      </View>
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
  },
  card: {
    backgroundColor: "#f8f8f8",
    borderRadius: 12,
    padding: 20,
    width: "100%",
    textAlign: "inherit",
    transition: "0.5s ease-in-out",
  },
  companyName: {
    marginBottom: 16,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    //width: "100%",

    // borderBottomWidth: 1,
  },
  companyNameText: {
    color: "#231f20",
    fontSize: 16,
    fontWeight: "700",
    textTransform: "capitalize",
  },
  title: {
    marginBottom: 16,
  },

  titleText: {
    color: colors.primary,
    fontSize: 20,
    fontWeight: "700",
    textTransform: "capitalize",
  },
  price: {
    marginBottom: 16,
  },
  priceText: {
    color: "#231f20",
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 0,
  },
  priceSubText: {
    color: "#231f20",
    fontSize: 16,
    opacity: 0.5,
  },
  options: {
    marginBottom: 5,
  },
  optionItem: {
    marginBottom: 12,
  },
  optionText: {
    color: "#231f20",
    fontSize: 14,
    fontWeight: "700",
  },
  optionValue: {
    color: "#231f20",
    fontSize: 14,
    marginBottom: 3,
  },
  moreText: {
    // color: "#24aa9d",
    cursor: "pointer",
    fontSize: 14,
    marginBottom: 0,
    textAlign: "right",
  },
  button: {
    // backgroundColor: "#24aa9d",
    borderRadius: 8,
    padding: 15,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 16,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
  basic: {
    backgroundColor: colors.basic,
  },
  standard: {
    backgroundColor: colors.standard,
  },
  premium: {
    backgroundColor: colors.premium,
  },
});
