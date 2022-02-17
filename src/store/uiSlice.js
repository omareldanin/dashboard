import { createSlice } from "@reduxjs/toolkit";
const uiSlice = createSlice({
  name: "ui",
  initialState: {
    sideBarIsVisiable: false,
    lang: "en",
    pageDir: "ltr",
  },
  reducers: {
    toggleSideBar(state) {
      state.sideBarIsVisiable = !state.sideBarIsVisiable;
    },
    setLang(state, action) {
      const data = action.payload;
      if (data === "en") {
        state.lang = "en";
        state.pageDir = "ltr";
        localStorage.setItem("lang", "en");
      } else {
        state.lang = "ar";
        state.pageDir = "rtl";
        localStorage.setItem("lang", "ar");
      }
    },
  },
});
export const uiSliceActions = uiSlice.actions;
export default uiSlice;
