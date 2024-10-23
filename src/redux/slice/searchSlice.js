import { createSlice } from "@reduxjs/toolkit";

const initialState = { 
  searchText: "",
  filterCategory: "",
  priceStart: 0,
  priceEnd: 1000,
  sortBy: "",
  orderDirection: "",
  page: 1,
  totalPages: undefined,
  totalResults: undefined,
};

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setInfoPageSearch: (state, action) => {
      return {
        ...state,
        ...action.payload
      }
    },
    setSearchText: (state, action) => {
      state.searchText = action.payload;
      state.page = 1;
    },
    setFilterCategory: (state, action) => {
      state.filterCategory = action.payload;
      state.page = 1;
    },
    setFilterPrice: (state, action)  => {
      state.priceStart = action.payload.start;
      state.priceEnd = action.payload.end;
      state.page = 1;
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload.sortBy;
      state.orderDirection = action.payload.order;
      state.page = 1;
    },
    setNewPage: (state, action) => {
      state.page = action.payload;
    },
    resetInfoPageSearch: (state) => {
      return {
        ...state,
        ...initialState,
      }
    }
  },
  extraReducers: () => {},
});

export default searchSlice;

export const {setInfoPageSearch, setFilterCategory, setFilterPrice, setSortBy, setSearchText, setNewPage, resetInfoPageSearch} = searchSlice.actions
