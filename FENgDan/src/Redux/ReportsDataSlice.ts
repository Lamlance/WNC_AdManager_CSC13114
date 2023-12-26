import { AdsGeoJson } from "@admanager/shared";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type ReportDataType = {
  data: AdsGeoJson.ReportGeoJsonProperty[];
  selectedReport: AdsGeoJson.ReportGeoJsonProperty[] | null;
};

const initialState: ReportDataType = {
  data: [],
  selectedReport: null,
};

const ReportsDataSlice = createSlice({
  name: "ReportsData",
  initialState,
  reducers: {
    addReportData: function (
      state,
      action: PayloadAction<AdsGeoJson.ReportGeoJsonProperty[]>,
    ) {
      state.data.push(...action.payload);
    },

    setSelectedReport: function (
      state,
      action: PayloadAction<AdsGeoJson.ReportGeoJsonProperty[] | null>,
    ) {
      state.selectedReport = action.payload;
    },
  },
});
export const { addReportData, setSelectedReport } = ReportsDataSlice.actions;
export default ReportsDataSlice;
