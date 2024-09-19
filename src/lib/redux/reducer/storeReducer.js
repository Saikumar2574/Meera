import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  parentCategories: [],
  childCategories: [],
  grandchildCategories: [],
  selectedParent: null,
  selectedChild: null,
  selectedGrandChild: null,
  products: null,
  breadcrumb: [],
  hasMore: true,
};

export const fetchProducts = createAsyncThunk(
  "shop/fetchProducts",
  async ({ categoryId, page = 1 }, { getState }) => {
    const { products } = getState().shop;
    const response = await axios.get(
      `https://7a3fd2dhfc.execute-api.ap-south-1.amazonaws.com/dev/categories?category_id=${categoryId}&category_type=products&page=${page}&per_page=12`
    );
    return {
      products: response.data.products,
      pagination: response.data.pagination,
    };
  }
);
const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    setParentCategories: (state, action) => {
      state.parentCategories = action.payload;
    },
    setChildCategories: (state, action) => {
      state.childCategories = action.payload;
    },
    setGrandchildCategories: (state, action) => {
      state.grandchildCategories = action.payload;
    },
    selectParent: (state, action) => {
      state.selectedParent = action.payload;
      state.selectedChild = null;
      state.selectedGrandChild = null;
      state.breadcrumb = [
        { name: "home", level: "root" },
        {
          name: state.parentCategories.find(
            (pc) => pc.id === action.payload?.id
          )?.name,
          level: "parent",
        },
      ];
    },
    selectChild: (state, action) => {
      state.selectedChild = action.payload;
      state.selectedGrandChild = null;
      state.breadcrumb = [
        { name: "home", level: "root" },
        {
          name: state.parentCategories.find(
            (pc) => pc.id === state.selectedParent?.id
          )?.name,
          level: "parent",
        },
        {
          name: state.childCategories?.find((c) => c.id === action.payload?.id)
            ?.name,
          level: "child",
        },
      ];
    },
    selectGrandChild: (state, action) => {
      state.selectedGrandChild = action.payload;
      state.breadcrumb = [
        { name: "home", level: "root" },
        {
          name: state.parentCategories.find(
            (pc) => pc.id === state.selectedParent?.id
          )?.name,
          level: "parent",
        },
        {
          name: state.childCategories?.find(
            (c) => c.id === state.selectedChild?.id
          )?.name,
          level: "child",
        },
        {
          name: state.grandchildCategories?.find(
            (gc) => gc.id === action.payload?.id
          )?.name,
          level: "grandchild",
        },
      ];
    },
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    clearChildCategories: (state) => {
      state.childCategories = [];
      state.selectedChild = null;
    },

    clearGrandchildCategories: (state) => {
      state.grandchildCategories = [];
      state.selectedGrandChild = null;
    },
    setHasMore(state, action) {
        state.hasMore = action.payload;
      },
    resetState: () => initialState, // Add this reducer to reset state
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      const { products, pagination } = action.payload;
      if (!Array.isArray(state.products)) {
        state.products = [];
      }
      state.products = [...state.products, ...products];
      state.hasMore = pagination.current_page < pagination.total_pages;
    //   state.currentPage = pagination.current_page + 1;
    });
  },
});

export const {
  setParentCategories,
  setChildCategories,
  setGrandchildCategories,
  selectParent,
  selectChild,
  selectGrandChild,
  clearChildCategories,
  clearGrandchildCategories,
  setProducts,
  setHasMore,
  resetState, // Export the action creator
} = categoriesSlice.actions;

export default categoriesSlice.reducer;
