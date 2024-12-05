
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slice/authSlice"; // Import the authReducer

const store = configureStore({
  reducer: {
    auth: authReducer, // Add auth slice to the store
  },
});

export default store;
