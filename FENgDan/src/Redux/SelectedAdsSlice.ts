import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import z from "zod";
import { AdsMarkerInfoSchema } from "../models/mock_markers";
type MarkerInfo = z.infer<typeof AdsMarkerInfoSchema> | null;
const initialState: MarkerInfo = null as MarkerInfo;

const SelectedAdsSlice = createSlice({
  name: "SelectedAdsLocation",
  initialState: initialState,
  reducers: {
    setSelectedAdsLocation: function (
      state,
      payload: PayloadAction<MarkerInfo>,
    ) {
      return payload.payload;
    },
  },
});

export const { setSelectedAdsLocation } = SelectedAdsSlice.actions;
export default SelectedAdsSlice;
