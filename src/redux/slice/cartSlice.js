import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  totalCartItems: 0,
};
export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setTotalCartItems: (state, action) => {
      return {
        ...state,
        totalCartItems: action.payload,
      };
    },
  },
  extraReducers: () => {},
});

export default cartSlice;

export const { setTotalCartItems } = cartSlice.actions;
