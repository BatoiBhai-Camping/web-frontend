import { configureStore } from "@reduxjs/toolkit";
import { baseApi } from "../services/baseApi";
import authReducer from "../features/auth/authSlice";
import loadingReducer from "../features/loading/loadingSlice";
import rootAdminReducer from "../features/root-admin/rootAdminSlice";

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    auth: authReducer,
    loading: loadingReducer,
    rootAdmin: rootAdminReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
