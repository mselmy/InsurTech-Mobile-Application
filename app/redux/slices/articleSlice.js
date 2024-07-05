import { api } from "./apiSlice";

const articleApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getAllArticles: builder.query({
            query: () => `articles`,
        }),
        getArticleById: builder.query({
            query: (id) => `articles/${id}`,
        }),
    }),
});

export const { useGetAllArticlesQuery, useGetArticleByIdQuery } = articleApi;

// import { api } from "./apiSlice";

// const QuestionApi = api.injectEndpoints({
//     endpoints: (builder) => ({
//         getQuestionsByCategoryId: builder.query({
//             query: (categoryId) => `Customers/GetQusetionsByCategory/${categoryId}`,
//         }),
//     }),
// });

// export const { useGetQuestionsByCategoryIdQuery } = QuestionApi;
