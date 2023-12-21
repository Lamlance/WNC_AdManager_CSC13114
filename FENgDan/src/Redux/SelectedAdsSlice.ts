import { AdsGeoJson } from "@admanager/shared";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
type MarkerInfo = AdsGeoJson.AdsGeoJsonProperty | null;
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
