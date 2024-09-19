import { combineReducers, configureStore } from "@reduxjs/toolkit";
import productSelectionSlice from "./reducer/productReducer";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import storeReducer from "./reducer/storeReducer";

const rootReducer = combineReducers({
  products: productSelectionSlice,
  shop: storeReducer,
});

const persistConfig = {
  key: "root",
  storage,
};

const resettableRootReducer = (state, action) => {
  if (action.type === "logout") {
    // Reset only the necessary parts of the state
    return {
      products: null,
      shop : null
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
