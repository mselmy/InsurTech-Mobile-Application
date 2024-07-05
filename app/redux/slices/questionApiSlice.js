import { api } from "./apiSlice";

const QuestionApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getQuestionsByCategoryId: builder.query({
      query: (categoryId) => `Customers/GetQusetionsByCategory/${categoryId}`,
    }),
  }),
});

export const { useGetQuestionsByCategoryIdQuery } = QuestionApi;
