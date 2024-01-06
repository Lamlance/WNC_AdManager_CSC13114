import { AuthApi } from "@admanager/shared";
import { createSlice } from "@reduxjs/toolkit";

type AuthState =
  | {
      isLoggedIn: false;
    }
  | {
      isLoggedIn: true;
      authToken: string;
      confirmToken: string | null;
      user: AuthApi.LoginResponse["user"];
    };

const initialState = {
  isLoggedIn: false,
} as AuthState;

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    verify: (state, action) => {
      state.isLoggedIn = true;
      if (state.isLoggedIn) {
        state.confirmToken = action.payload.confirmToken;
      }
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
