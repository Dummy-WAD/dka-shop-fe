import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  totalNotificationItems: 0,
};
export const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setTotalNotificationItems: (state, action) => {
      return {
        ...state,
        totalNotificationItems: action.payload,
      };
    },
  },
  extraReducers: () => {},
});

export default notificationSlice;

export const { setTotalNotificationItems } = notificationSlice.actions;
