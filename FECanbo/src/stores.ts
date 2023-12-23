import { Action, ThunkAction, configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./slices/api/apiSlice";
import selectedAdsInfoReducer from "./slices/selectedAdsInfoSlice";

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    selectedAdsInfo: selectedAdsInfoReducer,

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
