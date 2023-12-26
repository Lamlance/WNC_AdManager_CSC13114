// // slices/pointSlice.ts
// import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import { EditRequest } from '../types';

// // interface LocationState {
// //   name: string;
// //   address: string;
// //   lng: number;
// //   lat: number;
// //   isModalOpen: boolean;
// // }

// const initialState: EditRequest = {
//   id: '',
//   location: '',
//   sender: '',
//   address: '',
//   reason: '',
//   lng: 106.69379445290143,
//   lat: 10.788266281491206,
//   status: '',
// };

// const pointSlice = createSlice({
//   name: 'point',
//   initialState,
//   reducers: {
//     onChangeLocation: (state, action: PayloadAction<string>) => {
//       state.location = action.payload;
//     },
//     onChangeAddress: (state, action: PayloadAction<string>) => {
//       state.address = action.payload;
//     },
//     setLng: (state, action: PayloadAction<number>) => {
//       state.lng = action.payload;
//     },
//     setLat: (state, action: PayloadAction<number>) => {
//       state.lat = action.payload;
//     },
//     setStatus: (state, action: PayloadAction<string>) => {
//       state.status = action.payload;
//     },
//   },
// });

// export const {
//   onChangeLocation,
//   onChangeAddress,
//   setLng,
//   setLat,
//   setStatus,
// } = pointSlice.actions;

// export default pointSlice.reducer;
