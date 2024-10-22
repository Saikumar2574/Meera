import { getShortListedItems } from "@/components/service/getData";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async thunk to fetch shortlisted items
export const fetchShortlistItems = createAsyncThunk(
  "fetchShortlistItems",
  async () => {
    const response = await getShortListedItems();
    const shortlist = response.shortlists?.[0] || null;
    return shortlist;
  }
);

const initialState = {
  selectedIds: null,
  shortList: null,
};

const productSelectionSlice = createSlice({
  name: "selectedProducts",
  initialState,
  reducers: {
    setSelectedIds: (state, action) => {
      state.selectedIds = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Handle async thunk lifecycle actions if needed
    builder.addCase(fetchShortlistItems.fulfilled, (state, action) => {
      state.shortList = action.payload;
    });
  },
});

export const { setSelectedIds, setShortListItems } =
  productSelectionSlice.actions;
export default productSelectionSlice.reducer;
