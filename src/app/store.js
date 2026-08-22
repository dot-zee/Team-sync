import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/state/authSlice.jsx";
import themeReducer from "../shared/state/themeSlice.jsx"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    theme: themeReducer
  },
});
