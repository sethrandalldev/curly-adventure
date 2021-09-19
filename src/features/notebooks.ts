import { createSlice } from "@reduxjs/toolkit";
import { Notebook } from "../types";

interface NotebooksState {
  value: Array<Notebook>;
}

const initialState: NotebooksState = {
  value: [],
};

export const notebooks = createSlice({
  name: "notebooks",
  initialState,
  reducers: {
    addNotebooks: (state, action) => {
      state.value = state.value.concat(action.payload);
    },
    setNotebooks: (state, action) => {
      state.value = action.payload;
    },
    removeNotebook: (state, action) => {
      state.value = state.value.filter(
        (notebook: Notebook) => notebook._id !== action.payload
      );
    },
    addNotebookPage: (state, action) => {
      const notebookIndex = state.value.findIndex(
        (notebook: Notebook) => notebook._id === action.payload.id
      );
      state.value[notebookIndex].pages.push(action.payload.page);
    },
    updateNotebook: (state, action) => {
      const notebookIndex = state.value.findIndex(
        (notebook: Notebook) => notebook._id === action.payload.notebookId
      );
      state.value[notebookIndex].title = action.payload.title;
      state.value[notebookIndex].description = action.payload.description;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  addNotebooks,
  setNotebooks,
  removeNotebook,
  addNotebookPage,
  updateNotebook,
} = notebooks.actions;

export default notebooks.reducer;
