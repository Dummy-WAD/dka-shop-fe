import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  dataProducts: [],
  page: 1,
  totalPages: null,
  totalResults: null,
  limit: 20,
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
  },
  extraReducers: () => {},
});

// Export the reducer
export default productSlice;

export const { setListProductInfo } = productSlice.actions;
