// /client/src/redux/authSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoggedIn: (state) => {
      state.isLoggedIn = true; // Update state to logged in
    },
    logout: (state) => {
      state.isLoggedIn = false; // Update state to logged out
      localStorage.removeItem('token')
    },
  },
});

// Export actions to be used in components
export const { setLoggedIn, logout } = authSlice.actions;

// Export the reducer to be added to the store
export default authSlice.reducer;
