import { ButtonText, FlatList, Spinner } from "@gluestack-ui/themed";
import QuestionItem from "./QuestionItem";
import { useGetQuestionsByCategoryIdQuery } from "../../redux/slices/questionApiSlice";
import colors from "../../common/colors";
import { StyleSheet, Text, View } from "react-native";
import { useState } from "react";
import { Button } from "@gluestack-ui/themed";
import { selectCategoryId } from "../../redux/slices/applySlice";
import { useSelector } from "react-redux";
import { router } from "expo-router";
import GreetingComponent from "./GreetingComponent";

export default function QuestionList() {
  const categoryId = useSelector(selectCategoryId);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const {
    data: questions,
    error,
    isLoading,
  } = useGetQuestionsByCategoryIdQuery(categoryId || 1);

  function handleNext() {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      router.replace("/screens/plans/InsurancePlanListScreen");
    }
  }

  if (isLoading) return <Spinner size="large" color={colors.gray700} />;

  if (error) return <Text style={styles.errorText}>{error.message}</Text>;

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <GreetingComponent />
      <View style={styles.steeperContainer}>
        {
          // Stepper
          questions.map((_, index) => (
            <View
              key={index}
              style={[
                styles.steeper,
                {
                  backgroundColor:
                    index <= currentQuestionIndex
                      ? colors.primary
                      : colors.gray500,
                },
              ]}
            />
          ))
        }
      </View>
      <QuestionItem
        questions={questions}
        currentQuestionIndex={currentQuestionIndex}
        onAnswerSubmit={handleNext}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  errorText: {
    color: colors.red,
    textAlign: "center",
    marginTop: 10,
  },
  steeperContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 10,
  },
  steeper: {
    width: 50,
    height: 5,
    backgroundColor: colors.primary,
  },
});
