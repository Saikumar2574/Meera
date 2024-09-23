import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedIds: null,
};

const productSelectionSlice = createSlice({
  name: "selectedProducts",
  initialState,
  reducers: {
    setSelectedIds: (state, action) => {
      state.selectedIds = action.payload;
    },
  },
});

export const { setSelectedIds } = productSelectionSlice.actions;

export default productSelectionSlice.reducer;
