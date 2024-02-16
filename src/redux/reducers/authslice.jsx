import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  token: localStorage.getItem("token") || null, // Leggi il token dal local storage
  userId: null,
  role: null,
  loading: false,
  error: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.token = action.payload.token;
      state.userId = action.payload.userId; 
      state.role = action.payload.role; 
      state.error = null;
      localStorage.setItem("token", action.payload.token);
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    logoutUser: (state) => {
      state.isAuthenticated = false;
      state.token = null;
      state.userId = null;
      state.role = null;
      localStorage.removeItem("token"); 
    },
  },
});

export const { loginRequest, loginSuccess, loginFailure, logoutUser } =
  authSlice.actions;

export default authSlice.reducer;
