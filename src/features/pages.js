import { createSlice } from "@reduxjs/toolkit";

export const pages = createSlice({
  name: "pages",
  initialState: {
    value: [],
    selected: null,
  },
  reducers: {
    addPage: (state, action) => {
      state.value = state.value.push(action.payload);
    },
    setPages: (state, action) => {
      state.value = action.payload;
    },
    setSelected: (state, action) => {
      state.selected = action.payload;
    },
    updatePage: (state, action) => {
      const pageIndex = state.value.findIndex(
        (page) => page._id === action.payload.id
      );
      state.value[pageIndex].body = action.payload.body;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addPage, setPages, setSelected, updatePage } = pages.actions;

export default pages.reducer;
