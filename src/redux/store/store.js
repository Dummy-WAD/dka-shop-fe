import { configureStore } from "@reduxjs/toolkit";
import searchSlice from "../slice/searchSlice";
import authSlice from "../slice/authSlice";
import categorySlice from "../slice/categorySlice";
import productSlice from "../slice/productSlice";
import customerAdminSlice from "../slice/customerAdminSlice";
import cartSlice from "../slice/cartSlice";
import orderSlice from "../slice/orderSlice";
import discountSlice from "../slice/discountSlice";

const store = configureStore({
  reducer: {
    search: searchSlice.reducer,
    auth: authSlice.reducer,
    category: categorySlice.reducer,
    product: productSlice.reducer,
    customerAdmin: customerAdminSlice.reducer,
    cart: cartSlice.reducer,
    orderSlice: orderSlice.reducer,
    discount: discountSlice.reducer
  },
});
export default store;
