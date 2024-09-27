// src/store/authSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
      state.isLoggedIn = true;
    },
    logout: (state) => {
      // Resetting auth state on logout
      state.token = null;
      state.isLoggedIn = false;
    },
  },
});

export const { setToken, logout } = authSlice.actions;
export default authSlice.reducer;
