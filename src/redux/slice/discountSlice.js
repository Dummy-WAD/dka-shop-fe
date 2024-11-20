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
        }
    },
    setKeywordApply: (state, action) => {
        return {
            ...state,
            searchApply: action.payload,
            pageShow: 0,
        }
    }
  },
  extraReducers: () => {},
});

export default discountSlice;

export const { setListDiscountInfo, setCurrentPage, setIdSelected, setCurrentPageSelected, setCurrentPageShow, setProductSelected, setOrderApply, setKeywordApply  } = discountSlice.actions;