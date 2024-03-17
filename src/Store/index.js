import { configureStore } from "@reduxjs/toolkit";
import emails_Google from "./GmailSlice";
const siteStore = configureStore({
  reducer: {
    emails_Google: emails_Google.reducer,
  },
});
export default siteStore;
