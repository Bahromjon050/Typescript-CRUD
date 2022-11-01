import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./Userreducers";

export const store = configureStore({
  reducer: {
    userSlice: userSlice.reducer as any,
  },
});
