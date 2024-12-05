import { createSlice } from "@reduxjs/toolkit";

const initialProduct = {
  id: "",
  primaryImage: "",
  otherImages: [],
  name: "",
  price: "",
  currentPrice: "",
  description: "",
  category: {
    id: "",
    name: "",
  },
  productVariants: [],
};

const initialState = {
  product: initialProduct,
  dataProducts: [],
  page: 0,
  totalPages: null,
  totalResults: null,
  limit: 10,
  order: "",
  sortBy: "",
  search: "",
  idSelected: "",
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

// Export the reducer
export default productSlice;

export const { setListProductInfo, setCurrentPage, setIdSelected } =
  productSlice.actions;
