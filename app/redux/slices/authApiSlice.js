import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://insurtechapis.runasp.net/api/",
  }),
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (userData) => ({
        url: "Account/RegisterCustomer",
        method: "POST",
        body: userData,
      }),
    }),
    resendConfirmationEmail: builder.mutation({
      query: (email) => ({
        url: `Account/ResendConfirmationEmail?email=${email}`,
        method: "POST",
      }),
    }),
  }),
});

export const { useRegisterUserMutation, useResendConfirmationEmailMutation } =
  api;
