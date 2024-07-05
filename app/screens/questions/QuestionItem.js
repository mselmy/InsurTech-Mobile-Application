import { Formik } from "formik";
import { Text, TextInput, View } from "react-native";
import * as yup from "yup";
import colors from "../../common/colors";
import { Button, ButtonText } from "@gluestack-ui/themed";
import { useDispatch, useSelector } from "react-redux";
import { answerQuestion, selectAnswers } from "../../redux/slices/applySlice";

const validationSchema = yup.object().shape({
  answer: yup.string().required("Answer is required"),
});

export default function QuestionItem({
  questions,
  currentQuestionIndex,
  onAnswerSubmit,
}) {
  const dispatch = useDispatch();
  const answer = useSelector(selectAnswers);
  console.log("answers", answer);

  const question = questions[currentQuestionIndex];
  return (
    <Formik
      validationSchema={validationSchema}
      initialValues={{
        answer: "",
      }}
      onSubmit={(values, { resetForm }) => {
        console.log(values);
        dispatch(
          answerQuestion({
            questionId: question.id,
            answer: values.answer,
          })
        );
        onAnswerSubmit();
        resetForm();
      }}
    >
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        errors,
        touched,
        isValid,
      }) => (
        <View style={styles.container}>
          <Text style={styles.body}>{question.body}</Text>
          <TextInput
            style={styles.input}
            onChangeText={handleChange("answer")}
            onBlur={handleBlur("answer")}
            value={values.answer}
            placeholder="Enter your answer"
          />
          {errors.answer && (
            <Text style={styles.errorText}>{errors.answer}</Text>
          )}

          <Button
            style={isValid ? styles.button : styles.buttonDisabled}
            onPress={handleSubmit}
            disabled={!isValid && !touched.answer}
          >
            <ButtonText>
              {" "}
              {questions.length - 1 === currentQuestionIndex
                ? "Submit"
                : "Next"}
            </ButtonText>
          </Button>
        </View>
      )}
    </Formik>
  );
}

const styles = {
  container: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray300,
  },
  body: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.primaryDark,
    padding: 10,
    borderRadius: 5,
    marginBottom: 5,
  },
  errorText: {
    color: colors.red,
    marginBottom: 10,
    fontSize: 12,
  },
  button: {
    width: "100%",
    height: 35,
    borderRadius: 3,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  //button when disabled state is true
  buttonDisabled: {
    width: "100%",
    height: 35,
    borderRadius: 3,
    backgroundColor: colors.gray400,
    justifyContent: "center",
    alignItems: "center",
  },
};
