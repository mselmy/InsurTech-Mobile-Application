import { api } from "./apiSlice";

const authApi = api.injectEndpoints({
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
  overrideExisting: false, 
});

export const { useRegisterUserMutation, useResendConfirmationEmailMutation } =
  authApi;
