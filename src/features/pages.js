import { createSlice } from "@reduxjs/toolkit";

export const pages = createSlice({
  name: "pages",
  initialState: {
    value: [],
  },
  reducers: {
    addPages: (state, action) => {
      state.value = state.value.concat(action.payload);
    },
    setPages: (state, action) => {
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addPages, setPages } = pages.actions;

export default pages.reducer;
