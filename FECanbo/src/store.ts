import { Action, ThunkAction, configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./slices/api/apiSlice";

//import pointSlice from "./slices/pointSlice";
import modalSlice from "./slices/modalSlice";
import GoongApi from "./slices/GoongApi";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import placeSlice from "./slices/placeSlice"
import reportTypeSlice from "./slices/reportTypeSlice";
import authSlice from "./slices/authSlice";

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    [GoongApi.reducerPath]: GoongApi.reducer,
    //point: pointSlice,
    PlaceSlice: placeSlice,
    ModalSlice: modalSlice,
    PlaceEditModal: modalSlice,
    ReportTypeSlice: reportTypeSlice,
    auth: authSlice
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(apiSlice.middleware)
      .concat(GoongApi.middleware),
});
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
