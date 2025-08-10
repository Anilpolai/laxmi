// redux/store/store.js
import { configureStore } from "@reduxjs/toolkit";
import categoriesReducer from "../slice/categorySlice";

export const store = configureStore({
  reducer: {
    categories: categoriesReducer,
  },
});
