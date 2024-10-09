import { configureStore } from "@reduxjs/toolkit";
import searchSlice from "../slice/searchSlice";

const store = configureStore({
  reducer: {
    search: searchSlice.reducer,
  },
});
export default store;
