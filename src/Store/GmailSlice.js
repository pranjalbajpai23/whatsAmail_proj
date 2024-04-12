/* eslint-disable no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";

const emails_Google = createSlice({
  name: "mails_Google",
  initialState: [],
  reducers: {
    addInitialItems: (state, action) => {
      return [...state,...action.payload];
    },
    removeInitialItems: (state, action) => {
      return [];
    },
  },
});
export const gmailsAction = emails_Google.actions;
export default emails_Google;
