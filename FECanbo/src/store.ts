import { Action, ThunkAction, configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./slices/api/apiSlice";
import selectedAdsInfoReducer from "./slices/selectedAdsInfoSlice";
import selectedReportInfoSlice from "./slices/selectedReportInfoSlice";
import authSlice from "./slices/authSlice";

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    selectedAdsInfo: selectedAdsInfoReducer,
    selectedReportInfo: selectedReportInfoSlice,
    auth: authSlice
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export default store;
export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
