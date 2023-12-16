import { configureStore } from "@reduxjs/toolkit";
import SelectedAdsSlice from "./SelectedAdsSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import GoongApi from "./GoongApi";
import MapClickSlice from "./MapClickSlice";
const ReduxStore = configureStore({
  reducer: {
    SelectedAds: SelectedAdsSlice.reducer,
    MapClick: MapClickSlice.reducer,
    [GoongApi.reducerPath]: GoongApi.reducer,
  },
  middleware: (getDefaultMw) => getDefaultMw().concat(GoongApi.middleware),
});
type RootState = ReturnType<typeof ReduxStore.getState>;
type AppDispatch = typeof ReduxStore.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export default ReduxStore;
