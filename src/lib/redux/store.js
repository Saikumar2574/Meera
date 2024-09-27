import { combineReducers, configureStore } from "@reduxjs/toolkit";
import productSelectionSlice from "./reducer/productReducer";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import storeReducer from "./reducer/storeReducer";
import authReducer from "./reducer/authReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  products: productSelectionSlice,
  shop: storeReducer,
});

const persistConfig = {
  key: "root",
  storage,
};

const resettableRootReducer = (state, action) => {
  if (action.type === "auth/logout") {
    // Reset only the necessary parts of the state
    state = {
      auth: state.auth, // Keep auth state intact for persist
      products: { selectedIds: null },
      shop: {
        parentCategories: [],
        childCategories: [],
        grandchildCategories: [],
        selectedParent: null,
        selectedChild: null,
        selectedGrandChild: null,
        products: null,
        breadcrumb: [],
        hasMore: true,
      },
    };
  }
  return rootReducer(state, action);
};

const persistedReducer = persistReducer(persistConfig, resettableRootReducer);

const store = configureStore({
  reducer: persistedReducer,
});

const persistor = persistStore(store);

export { store, persistor };
