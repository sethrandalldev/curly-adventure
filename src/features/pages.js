import { createSlice } from "@reduxjs/toolkit";

export const pages = createSlice({
  name: "pages",
  initialState: {
    value: [],
    selected: null,
  },
  reducers: {
    addPages: (state, action) => {
      state.value = state.value.concat(action.payload);
    },
    setPages: (state, action) => {
      state.value = action.payload;
    },
    setSelected: (state, action) => {
      state.selected = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addPages, setPages, setSelected } = pages.actions;

export default pages.reducer;
