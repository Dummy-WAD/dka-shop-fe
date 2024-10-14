import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    category: {},
    page: 0,
    totalPages: 0,
    totalResults: 0,
    orderBy: "",
    orderDirection: "",
    search: "",
};
export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setCategoryInfo: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
    resetCategoryState: (state) => {
      return {
        ...state,
        orderBy: "",
        orderDirection: "",
        search: "",
        page: 0
      }
    }
  },
  extraReducers: () => {},
});

// Export the reducer
export default categorySlice;

export const {resetCategoryState} = categorySlice.actions
