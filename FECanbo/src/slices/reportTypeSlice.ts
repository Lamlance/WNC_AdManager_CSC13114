import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ReportApi } from "@admanager/shared";

interface reportTypeState {
  reportTypeId: number;
  reportTypeName: string;
  reportTypeList: ReportApi.ReportTypeProperty[];
}

const initialState: reportTypeState = {
    reportTypeId: -1,
    reportTypeName: '',
    reportTypeList: []
};

const reportTypeSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    loadData: (state, action) => {
      state.reportTypeList = action.payload;
    },
    setSelectedReportType: (state, action: PayloadAction<ReportApi.ReportTypeProperty>) => {
      state.reportTypeId = action.payload.id_loai_bc;
      state.reportTypeName = action.payload.loai_bao_cao;
    },
    setReportTypeId: (state, action) => {
      state.reportTypeId = action.payload;
    },
    setReportTypeName: (state, action) => {
      state.reportTypeName = action.payload;
    },
  },
});

export const { loadData, setSelectedReportType, setReportTypeId, setReportTypeName } =
reportTypeSlice.actions;

export default reportTypeSlice.reducer;
