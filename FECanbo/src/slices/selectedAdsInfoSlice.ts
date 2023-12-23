import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AdsInfoRecord } from "../types/view-model";

interface SelectedAdsInfoState {
    data: AdsInfoRecord | null;
}

const initialState: SelectedAdsInfoState = {
    data: null
};

export const selectedAdsInfoSlice = createSlice({
    name: 'selectedAdsInfo',
    initialState,
    reducers: {
        select: (state, action: PayloadAction<AdsInfoRecord>) => {
            state.data = action.payload
        }
    }
})

export const { select } = selectedAdsInfoSlice.actions;

export const getSelectedAdsInfo = (state: SelectedAdsInfoState) => state.data;

export default selectedAdsInfoSlice.reducer;