import { createSlice } from "@reduxjs/toolkit";

export const notebooks = createSlice({
  name: "notebooks",
  initialState: {
    value: [],
  },
  reducers: {
    addNotebooks: (state, action) => {
      state.value = state.value.concat(action.payload);
    },
    setNotebooks: (state, action) => {
      state.value = action.payload;
    },
    removeNotebook: (state, action) => {
      state.value = state.value.filter(
        (notebook) => notebook._id !== action.payload
      );
    },
  },
});

// Action creators are generated for each case reducer function
export const { addNotebooks, setNotebooks, removeNotebook } = notebooks.actions;

export default notebooks.reducer;
