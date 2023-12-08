import { configureStore } from "@reduxjs/toolkit";
import SelectedAdsSlice from "./SelectedAdsSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
const ReduxStore = configureStore({
  reducer: {
    SelectedAds: SelectedAdsSlice.reducer,
  },
});
type RootState = ReturnType<typeof ReduxStore.getState>;
type AppDispatch = typeof ReduxStore.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export default ReduxStore;
