import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./slices/api/apiSlice";
<<<<<<< HEAD
import pointSlice from "./slices/pointSlice";
import modalSlice from "./slices/modalSlice";
=======
//import pointSlice from "./slices/pointSlice";
import modalSlice from "./slices/modalSlice";
import GoongApi from "./slices/GoongApi";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
>>>>>>> 920c6bb3c62c34021bba84d4adc2c7eb41b3023a

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
<<<<<<< HEAD
    point: pointSlice,
    modal: modalSlice,
=======
    [GoongApi.reducerPath]: GoongApi.reducer,
    //point: pointSlice,
    PlaceEditModal: modalSlice,
>>>>>>> 920c6bb3c62c34021bba84d4adc2c7eb41b3023a
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(apiSlice.middleware)
      .concat(GoongApi.middleware),
});

<<<<<<< HEAD

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
=======
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
>>>>>>> 920c6bb3c62c34021bba84d4adc2c7eb41b3023a
export default store;
