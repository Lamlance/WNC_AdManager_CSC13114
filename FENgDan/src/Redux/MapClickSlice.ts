import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type MapClickState = { dblClick: { lng: number; lat: number } } | null;
const initialState = null as MapClickState;
const MapClickSlice = createSlice({
  name: "MapClick",
  initialState,
  reducers: {
    setDblClick: function (
      state,
      action: PayloadAction<{ lng: number; lat: number }>,
    ) {
      if (!state) return { dblClick: action.payload };
      return { ...state, dblClick: action.payload };
    },
  },
});
export const { setDblClick } = MapClickSlice.actions;
export default MapClickSlice;
