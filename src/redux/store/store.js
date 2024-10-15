import { configureStore } from "@reduxjs/toolkit";
import searchSlice from "../slice/searchSlice";
import authSlice from "../slice/authSlice";
import categorySlice from "../slice/categorySlice";
import productSlice from "../slice/productSlice";

const store = configureStore({
  reducer: {
    search: searchSlice.reducer,
    auth: authSlice.reducer,
    category: categorySlice.reducer,
    product: productSlice.reducer,
  },
});
export default store;
