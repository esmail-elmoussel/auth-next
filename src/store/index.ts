import { authApi } from "@/services/auth.service";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    authApi: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(authApi.middleware);
  },
});
