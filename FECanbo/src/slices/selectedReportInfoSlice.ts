import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ReportInfoRecord } from "../types/view-model";

interface SelectedReportInfoState {
    data: ReportInfoRecord | null;
}

const initialState: SelectedReportInfoState = {
    data: null
};

export const selectedReportInfoSlice = createSlice({
    name: 'selectedReportInfo',
    initialState,
    reducers: {
        select: (state, action: PayloadAction<ReportInfoRecord>) => {
            state.data = action.payload
        }
    }
})

export const { select } = selectedReportInfoSlice.actions;

export const getSelected = (state: SelectedReportInfoState) => state.data;

export default selectedReportInfoSlice.reducer;