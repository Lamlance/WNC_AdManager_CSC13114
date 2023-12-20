// slices/locationSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { EditRequest } from '../types';

interface LocationState {
  name: string;
  address: string;
  lng: number;
  lat: number;
  isModalOpen: boolean;
}

const initialState: LocationState = {
  name: '',
  address: '',
  lng: 106.69379445290143,
  lat: 10.788266281491206,
  isModalOpen: false,
};

const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {
    onChangeName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    onChangeAddress: (state, action: PayloadAction<string>) => {
      state.address = action.payload;
    },
    setLng: (state, action: PayloadAction<number>) => {
      state.lng = action.payload;
    },
    setLat: (state, action: PayloadAction<number>) => {
      state.lat = action.payload;
    },
    showModalClose: (state) => {
      state.isModalOpen = false;
    },
    showModalOpen: (state) => {
      state.isModalOpen = true;
    },
  },
});

export const {
  onChangeName,
  onChangeAddress,
  setLng,
  setLat,
  showModalClose,
  showModalOpen,
} = locationSlice.actions;

export default locationSlice.reducer;
