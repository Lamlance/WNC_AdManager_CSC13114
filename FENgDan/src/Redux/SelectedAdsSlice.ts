import { AdsGeoJson, ReportApi } from "@admanager/shared";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;
type MarkerInfo =
  | AdsGeoJson.AdsGeoJsonProperty
  | {
      ads: [];
      place: ReportApi.ReportPlace;
    }
  | null;
const initialState: MarkerInfo = null as MarkerInfo;

const SelectedAdsSlice = createSlice({
  name: "SelectedAdsLocation",
  initialState: initialState,
  reducers: {
    setSelectedAdsLocation: function (_, payload: PayloadAction<MarkerInfo>) {
      return payload.payload;
    },
  },
});

export const { setSelectedAdsLocation } = SelectedAdsSlice.actions;
export default SelectedAdsSlice;
