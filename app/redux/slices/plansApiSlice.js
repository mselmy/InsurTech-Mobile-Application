import { api } from "./apiSlice";

const planApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getPlansByCategoryId: builder.query({
      query: (categoryId) =>
        `InsurancePlan/GetInsurancePlansByCategoryId/${categoryId}`,
    }),
    requestInsurancePlan: builder.mutation({
      query: (insurancePlan) => ({
        url: "Customers/requestInsurancePlan",
        method: "POST",
        body: insurancePlan,
      }),
    }),
  }),
});

export const { useGetPlansByCategoryIdQuery, useRequestInsurancePlanMutation } =
  planApi;
