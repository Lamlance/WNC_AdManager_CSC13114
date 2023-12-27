<<<<<<< HEAD
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface modalState {
  isModalOpen: boolean;
}

const initialState: modalState = {
  isModalOpen: false,
};

const pointSlice = createSlice({
  name: 'modal',
=======
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
  isModalOpen: true,
  selectedPlace: null,
};

const pointSlice = createSlice({
  name: "modal",
>>>>>>> 920c6bb3c62c34021bba84d4adc2c7eb41b3023a
  initialState,
  reducers: {
    showModalClose: (state) => {
      state.isModalOpen = false;
    },
    showModalOpen: (state) => {
      state.isModalOpen = true;
    },
<<<<<<< HEAD
  },
});

export const {
  showModalOpen,
  showModalClose,
} = pointSlice.actions;
=======
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
>>>>>>> 920c6bb3c62c34021bba84d4adc2c7eb41b3023a

export default pointSlice.reducer;
