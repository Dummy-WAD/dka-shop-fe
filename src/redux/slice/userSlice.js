import { createSlice } from "@reduxjs/toolkit";

const initialState = {};
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: () => {},
});

// Export the reducer
export default userSlice.reducer;
