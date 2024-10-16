import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  dataProducts: [],
  page: 0,
  totalPages: null,
  totalResults: null,
  limit: 10,
  order: "",
  sortBy: "",
  search: "",
};
export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setListProductInfo: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
    setCurrentPage: (state, action) => {
      return {
        ...state,
        page: action.payload,
      };
    },
  },
  extraReducers: () => {},
});

// Export the reducer
export default productSlice;

export const { setListProductInfo, setCurrentPage } = productSlice.actions;