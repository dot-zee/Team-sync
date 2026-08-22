import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../../config/axiosInstance";
import { toast } from "react-toastify";
// export const loginAction = createAsyncThunk("auth/login", () => {});
export const loginAction = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post("auth/login", credentials);

      // NEW
      toast.success("Logged in successfully");
      localStorage.setItem("employee", JSON.stringify(res.data.data));

      return res.data.data;
    } catch (error) {
      // NEW
      toast.error("Login Failed");

      return rejectWithValue(error);
    }
  },
);

// Use inside AppRoutes.jsx
export const currentEmployee = createAsyncThunk(
  "auth/me",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get("auth/me");
      console.log(res);
      return res.data.user;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);
