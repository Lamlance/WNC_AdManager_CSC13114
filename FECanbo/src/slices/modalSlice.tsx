import { PlaceChangeApi } from "@admanager/shared";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface modalState {
  isModalOpen: boolean;
  selectedPlace:
    | PlaceChangeApi.PlaceChangeRequestResponse
    | PlaceChangeApi.PlaceChangeRequestCreate
    | null;
}

const initialState: modalState = {
  isModalOpen: false,
  selectedPlace: null,
};

const pointSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    showModalClose: (state) => {
      state.isModalOpen = false;
    },
    showModalOpen: (state) => {
      state.isModalOpen = true;
    },
    setSelectedPlace: (
      state,
      action: PayloadAction<modalState["selectedPlace"]>,
    ) => {
      state.selectedPlace = action.payload;
    },
  },
});

export const { showModalOpen, showModalClose, setSelectedPlace } =
  pointSlice.actions;

export default pointSlice.reducer;
