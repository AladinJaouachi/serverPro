import { createSlice } from "@reduxjs/toolkit";

var initialState = { value: false };
export const profilSlice = createSlice({
  name: "profil",
  initialState,
  reducers: {
    changeprofil: (state, action) => {
      state.value = action.payload;
    },
  },
});
export const { changeprofil } = profilSlice.actions;
export default profilSlice.reducer;
