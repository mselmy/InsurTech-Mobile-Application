import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";
import { api } from "./slices/apiSlice";
import applySlice from "./slices/applySlice";

const store = configureStore({
  reducer: {
    user: userSlice,
    apply: applySlice,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export default store;
