import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  currentUser: null,
  allUsers: [],
};
const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
    setAllUsers: (state, action) => {
      state.allUsers = action.payload;
    },
  },
});
export const { setCurrentUser, setAllUsers } = accountSlice.actions;
export default accountSlice.reducer;
