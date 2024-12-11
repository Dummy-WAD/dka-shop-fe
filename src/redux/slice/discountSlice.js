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
  currrentDiscountSelected: null,
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
  status: "",
  productSelected: null,
  pageShow: 0,
  pageSelected: 0,
  orderApply: {
    orderBy: "",
    orderDirection: "",
  },
  searchApply: "",
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
    setCurrentDiscountSelected: (state, action) => {
      return {
        ...state,
        currentDiscountSelected: action.payload,
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
    setProductSelected: (state, action) => {
      state.productSelected = action.payload;
    },
    setCurrentPageShow: (state, action) => {
      state.pageShow = action.payload;
    },
    setCurrentPageSelected: (state, action) => {
      state.pageSelected = action.payload;
    },
    setOrderApply: (state, action) => {
      return {
        ...state,
        orderApply: action.payload,
        pageShow: 0,
      };
    },
    setKeywordApply: (state, action) => {
      return {
        ...state,
        searchApply: action.payload,
        pageShow: 0,
      };
    },
  },
  extraReducers: () => {},
});

export default discountSlice;

export const {
  setListDiscountInfo,
  setCurrentPage,
  setIdSelected,
  setCurrentDiscountSelected,
  setCurrentPageSelected,
  setCurrentPageShow,
  setProductSelected,
  setOrderApply,
  setKeywordApply,
} = discountSlice.actions;
