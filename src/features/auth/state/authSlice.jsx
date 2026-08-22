import { createSlice } from "@reduxjs/toolkit";
import { currentEmployee, loginAction } from "./LoginAction";

const loggedInEmployee = localStorage.getItem("employee");
const parsedEmployee = loggedInEmployee ? JSON.parse(loggedInEmployee) : null;

const authSlice = createSlice({
  name: "auth",
  initialState: {
    employee: parsedEmployee,
    isLoading: false,
  },
  reducers: {
    addEmployee: (state, action) => {
      ((state.employee = action.payload), (state.isLoading = false));
    },
    removeEmployee: (state) => {
      ((state.employee = null), (state.isLoading = false));

      localStorage.removeItem("employee");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginAction.fulfilled, (state, action) => {
        ((state.employee = action.payload), (state.isLoading = false));
      })
      .addCase(loginAction.rejected, (state) => {
        ((state.employee = null), (state.isLoading = false));
      })
      .addCase(currentEmployee.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(currentEmployee.fulfilled, (state, action) => {
        ((state.employee = action.payload), (state.isLoading = false));
      })
      .addCase(currentEmployee.rejected, (state) => {
        ((state.employee = null), (state.isLoading = false));
      });
  },
});

export const { addEmployee, removeEmployee } = authSlice.actions;
export default authSlice.reducer;
