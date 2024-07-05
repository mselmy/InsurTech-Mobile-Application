import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categoryId: null,
  insuranceId: null,
  answers: [],
};

const applySlice = createSlice({
  name: "apply",
  initialState,
  reducers: {
    answerQuestion(state, action) {
      const index = state.answers.findIndex(
        (answer) => answer.questionId === action.payload.questionId
      );
      if (index !== -1) {
        state.answers[index] = action.payload;
      } else {
        state.answers.push(action.payload);
      }
    },
    setCategoryId(state, action) {
      state.categoryId = action.payload;
    },
    setInsuranceId(state, action) {
      state.insuranceId = action.payload;
    },
  },
});

export const { setCategoryId, setInsuranceId, answerQuestion } =
  applySlice.actions;

export const selectCategoryId = (state) => state.apply.categoryId;

export const selectInsuranceId = (state) => state.apply.insuranceId;

export const selectAnswers = (state) => state.apply.answers;

export default applySlice.reducer;
