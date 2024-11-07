import { createSlice } from "@reduxjs/toolkit";

const initialOrder = {
  id: "",
  customerEmail: "",
  price: "",
  status: "",
  createdDate: "",
  lastUpdated: "",
};

const initialState = {
  order: initialOrder,
  dataOrders: [],
  page: 0,
  totalPages: null,
  totalResults: null,
  limit: 10,
  order: "",
  sortBy: "",
  search: "",
  idSelected: "",
  status: "",
};

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setListOrderInfo: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
    setIdSelected: (state, action) => {
      return {
        ...state,
        idSelected: action.payload,
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

export default orderSlice;

export const { setListOrderInfo, setCurrentPage, setIdSelected } =
  orderSlice.actions;
