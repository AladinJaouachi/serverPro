import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slice/Userslice";
import admininSlice from "./slice/Adminslice";

export const store = configureStore({
  reducer: {
    user: userSlice,
    admin: admininSlice,
  },
});
