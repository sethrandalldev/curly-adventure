import { createSlice } from "@reduxjs/toolkit";
import { Page } from "../types";

interface PagesState {
  value: Array<Page>;
  selected: Page | null;
}

const initialState: PagesState = {
  value: [],
  selected: null,
};

export const pages = createSlice({
  name: "pages",
  initialState,
  reducers: {
    addPage: (state, action) => {
      state.value.push(action.payload);
    },
    setPages: (state, action) => {
      state.value = action.payload;
    },
    setSelected: (state, action) => {
      state.selected = action.payload;
    },
    updatePage: (state, action) => {
      const pageIndex = state.value.findIndex((page) => {
        return page._id === action.payload.id;
      });
      state.value[pageIndex].title = action.payload.title;
      state.value[pageIndex].body = action.payload.body;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addPage, setPages, setSelected, updatePage } = pages.actions;

export default pages.reducer;
