import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slice/Userslice";
import admininSlice from "./slice/Adminslice";
import profilSlice from "./slice/profil";

export const store = configureStore({
  reducer: {
    user: userSlice,
    admin: admininSlice,
    profil: profilSlice,
  },
});
