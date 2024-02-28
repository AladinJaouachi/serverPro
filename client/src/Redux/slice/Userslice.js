import { createSlice } from "@reduxjs/toolkit";

var initialState;
const getToken = localStorage.getItem("token");
getToken ? (initialState = { value: true }) : (initialState = { value: false });

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    changeStateUser: (state) => {
      state.value = !state.value;
    },
  },
});
export const { changeStateUser } = userSlice.actions;

export default userSlice.reducer;
