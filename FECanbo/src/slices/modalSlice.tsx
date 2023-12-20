import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface modalState {
  isModalOpen: boolean;
}

const initialState: modalState = {
  isModalOpen: false,
};

const pointSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    showModalClose: (state) => {
      state.isModalOpen = false;
    },
    showModalOpen: (state) => {
      state.isModalOpen = true;
    },
  },
});

export const {
  showModalOpen,
  showModalClose,
} = pointSlice.actions;

export default pointSlice.reducer;
