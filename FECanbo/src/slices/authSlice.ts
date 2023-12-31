import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoggedIn: false,
    user: null,
    token: null,
    loading: false,
    error: null,
    confirmToken: null,
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        verify: (state, action) => {
            state.confirmToken = action.payload.confirmToken
        },
        loginStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        loginSuccess: (state, action) => {
            state.loading = false;
            state.isLoggedIn = true;
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        loginFailure: (state, action) => {
            state.isLoggedIn = false;
            state.user = action.payload.error;
        },
        logout: (state) => {
            state.isLoggedIn = false;
            state.user = null;
            state.token = null;
        }
    }
})

export const { verify, loginStart, loginSuccess, loginFailure, logout } = authSlice.actions;
export default authSlice.reducer;