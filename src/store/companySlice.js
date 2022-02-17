import { createSlice } from "@reduxjs/toolkit";
const companySlice = createSlice({
  name: "companies",
  initialState: {
    data: {
      rows: [],
      pages: 1,
      currentPage: 1,
    },
  },
  reducers: {
    setPage(state, action) {
      const page = action.payload;
      state.data.currentPage = page;
    },
    setPagesNum(state, action) {
      state.data.pages = action.payload;
    },
    setNextPage(state) {
      if (state.data.currentPage !== state.data.pages) {
        state.data.currentPage = state.data.currentPage + 1;
      }
    },
    setPrePage(state) {
      if (state.data.currentPage > 1) {
        --state.data.currentPage;
      }
    },
  },
});
export const companySliceActions = companySlice.actions;
export default companySlice;
