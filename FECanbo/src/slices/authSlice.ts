import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoggedIn: false,
    authToken: null,
    confirmToken: null,
    user: null,
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        verify: (state, action) => {
            state.confirmToken = action.payload.confirmToken
        },
        login: (state, action) => {
            state.isLoggedIn = true;
            state.authToken = action.payload.authToken;
            state.user = action.payload.user;
        },
        logout: (state) => {
            state.isLoggedIn = false;
            state.authToken = null;
            state.user = null;
        }
    }
})

export const { verify, login, logout } = authSlice.actions;
export default authSlice.reducer;