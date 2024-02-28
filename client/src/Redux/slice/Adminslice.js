import { createSlice } from "@reduxjs/toolkit";

var initialState;
const getToken = localStorage.getItem("token");
getToken ? (initialState = { value: true }) : (initialState = { value: false });

export const admininSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    changestateadmin: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { changestateadmin } = admininSlice.actions;

export default admininSlice.reducer;
