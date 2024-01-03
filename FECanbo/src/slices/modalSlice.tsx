import { PlaceChangeApi } from "@admanager/shared";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface modalState {
  isModalOpen: boolean;
  isAddPlaceModalOpen: boolean;
  isEditPlaceModalOpen: boolean;
  selectedPlace:
    | PlaceChangeApi.PlaceChangeRequestResponse
    | PlaceChangeApi.PlaceChangeRequestCreate
    | null;
}

const initialState: modalState = {
  isModalOpen: false,
  isAddPlaceModalOpen: false,
  isEditPlaceModalOpen: false,
  selectedPlace: null,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    showModalClose: (state) => {
      state.isModalOpen = false;
    },
    showModalOpen: (state) => {
      state.isModalOpen = true;
    },
    showAddPlaceModalClose: (state) => {
      state.isAddPlaceModalOpen = false;
    },
    showAddPlaceModalOpen: (state) => {
      state.isAddPlaceModalOpen = true;
    },
    showEditPlaceModalClose: (state) => {
      state.isEditPlaceModalOpen = false;
    },
    showEditPlaceModalOpen: (state) => {
      state.isEditPlaceModalOpen = true;
    },
    setSelectedPlace: (
      state,
      action: PayloadAction<modalState["selectedPlace"]>,
    ) => {
      state.selectedPlace = action.payload;
    },
  },
});

export const { showModalOpen, showModalClose, showAddPlaceModalOpen, showAddPlaceModalClose, showEditPlaceModalOpen, showEditPlaceModalClose, setSelectedPlace } =
  modalSlice.actions;

export default modalSlice.reducer;
