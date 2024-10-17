import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  customerList: [],
  page: 0,
  totalPages: null,
  totalResults: null,
  order: "",
  sortBy: "",
  keyword: "",
  status: "ACTIVE",
};
export const customerAdminSlice = createSlice({
  name: "customerAdmin",
  initialState,
  reducers: {
    setCustomerInfo: (state, action) => {
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
export default customerAdminSlice;
