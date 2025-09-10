// redux/store/store.js
import { configureStore } from "@reduxjs/toolkit";
import categoriesReducer from "../slice/categorySlice";
import wishlistReducer from "../slice/wishlistSlice";
import productReducer from "../slice/quickshopSlice";

export const store = configureStore({
  reducer: {
    wishlist: wishlistReducer,
    categories: categoriesReducer,
     products: productReducer,
  },
});
  