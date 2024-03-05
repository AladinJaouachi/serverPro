import { createSlice } from "@reduxjs/toolkit";

var initialState;
const tokenuser = localStorage.getItem("tokenuser");
tokenuser
  ? (initialState = { value: true })
  : (initialState = { value: false });

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    changeStateUser: (state, action) => {
      state.value = action.payload;
    },
  },
});
export const { changeStateUser } = userSlice.actions;

export default userSlice.reducer;
