import { createSlice } from "@reduxjs/toolkit";

const initialDiscount = {
  id: "",
  discountValue: "",
  discountType: "",
  startDate: "",
  expirationDate: "",
  isDeleted: false,
  createdAt: "",
  type: "",
  updatedAt: "",
  status: "",
};

const initialState = {
  discount: initialDiscount,
  dataDiscounts: [],
  page: 0,
  totalPages: null,
  totalResults: null,
  limit: 10,
  discount: "",
  sortBy: "",
  search: "",
  idSelected: "",
  type: "",
};

export const discountSlice = createSlice({
  name: "discount",
  initialState,
  reducers: {
    setListDiscountInfo: (state, action) => {
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

export default discountSlice;

export const { setListDiscountInfo, setCurrentPage, setIdSelected } =
  discountSlice.actions;
