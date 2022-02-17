import { createSlice } from "@reduxjs/toolkit";
const authSlice = createSlice({
  name: "auth",
  initialState: {
    userData: {},
    isLoggedin: false,
  },
  reducers: {
    addUserData(state, action) {
      const data = action.payload;
      state.userData = {
        ...data,
      };
    },
    login(state) {
      state.isLoggedin = true;
      localStorage.setItem("userData", JSON.stringify(state.userData));
    },
    logout(state) {
      state.isLoggedin = false;
      localStorage.removeItem("userData");
    },
  },
});
export const authSliceActions = authSlice.actions;
export default authSlice;
