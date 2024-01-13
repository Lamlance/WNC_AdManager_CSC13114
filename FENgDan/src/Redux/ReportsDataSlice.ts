import { AdsGeoJson } from "@admanager/shared";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type ReportDataType = {
  selectedReport: AdsGeoJson.ReportGeoJsonProperty[] | null;
};

const initialState: ReportDataType = {
  selectedReport: null,
};

const ReportsDataSlice = createSlice({
  name: "ReportsData",
  initialState,
  reducers: {
    setSelectedReport: function (
      state,
      action: PayloadAction<AdsGeoJson.ReportGeoJsonProperty[] | null>,
    ) {
      state.selectedReport = action.payload;
    },
  },
});
export const { setSelectedReport } = ReportsDataSlice.actions;
export default ReportsDataSlice;
