import { createSlice } from "@reduxjs/toolkit";
import { userDateType } from "../components/Navbar";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    userData: JSON.parse(
      localStorage.getItem("users") || "false"
    ) as userDateType[],
  },
  reducers: {
    userAdd: (state, { payload }) => {
      if (!state.userData) {
        localStorage.setItem("users", JSON.stringify([payload]));
      } else {
        localStorage.setItem(
          "users",
          JSON.stringify([...state.userData, payload])
        );
      }
      state.userData = JSON.parse(localStorage.getItem("users") || "false");
    },
    userEdit: (state, { payload }) => {
      localStorage.setItem(
        "users",
        JSON.stringify(
          state.userData.map((val) => (val.id === payload.id ? payload : val))
        )
      );
      state.userData = JSON.parse(localStorage.getItem("users") || "false");
    },
    userDelete: (state, { payload }) => {
      localStorage.setItem(
        "users",
        JSON.stringify(state.userData.filter((val) => val.id !== payload))
      );
      state.userData = JSON.parse(localStorage.getItem("users") || "false");
    },
  },
});
export default userSlice.reducer;
export const { userAdd, userEdit, userDelete } = userSlice.actions;
