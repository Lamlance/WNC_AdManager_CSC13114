import { configureStore } from "@reduxjs/toolkit";
import SelectedAdsSlice from "./SelectedAdsSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import GoongApi from "./GoongApi";
import MapClickSlice from "./MapClickSlice";
import GeoJsonApi from "./GeoJsonSlice";
import ReportsDataSlice from "./ReportsDataSlice";
const ReduxStore = configureStore({
  reducer: {
    SelectedAds: SelectedAdsSlice.reducer,
    MapClick: MapClickSlice.reducer,
    ReportsData: ReportsDataSlice.reducer,

    [GoongApi.reducerPath]: GoongApi.reducer,
    [GeoJsonApi.reducerPath]: GeoJsonApi.reducer,
  },
  middleware: (getDefaultMw) =>
    getDefaultMw().concat(GoongApi.middleware).concat(GeoJsonApi.middleware),
});
type RootState = ReturnType<typeof ReduxStore.getState>;
type AppDispatch = typeof ReduxStore.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export default ReduxStore;
