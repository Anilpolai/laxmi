// redux/store/store.js
import { configureStore } from "@reduxjs/toolkit";
import categoriesReducer from "../slice/categorySlice";
import wishlistReducer from "../slice/wishlistSlice";

export const store = configureStore({
  reducer: {
    wishlist: wishlistReducer,
    categories: categoriesReducer,
  },
});
