import { createSlice } from "@reduxjs/toolkit";

export const user = createSlice({
  name: "user",
  initialState: {
    id: "",
    firstName: "",
    lastName: "",
    email: "",
  },
  reducers: {
    setUser: (state, action) => {
      const user = action.payload;
      state.id = user.id;
      state.firstName = user.firstName;
      state.lastName = user.lastName;
      state.email = user.email;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUser } = user.actions;

export default user.reducer;
