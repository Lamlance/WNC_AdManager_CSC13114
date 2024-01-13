import { AuthApi } from "@admanager/shared";
import { createSlice } from "@reduxjs/toolkit";

type AuthState =
  | {
      isLoggedIn: false;
      confirmToken: string;
    }
  | {
      isLoggedIn: true;
      authToken: string;
      confirmToken: string;
      user: AuthApi.LoginResponse["user"];
    };

const initialState = {
  isLoggedIn: false,
  confirmToken: "",
} as AuthState;

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    verify: (state, action) => {
      state.confirmToken = action.payload.confirmToken;
    },
    login: (state, action) => {
      state.isLoggedIn = true;
      if (state.isLoggedIn) {
        state.authToken = action.payload.authToken;
        state.user = action.payload.user;
      }
    },
    logout: (state) => {
      state.isLoggedIn = false;
    },
  },
});

export const { verify, login, logout } = authSlice.actions;
export default authSlice;
