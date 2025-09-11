// src/redux/store/store.js
import { configureStore } from "@reduxjs/toolkit";
import {
  categoryReducer,
  productReducer,
  wishlistReducer,
  reviewReducer,
} from "../slice/rootslice";  // ✅ single import from index.js

export const store = configureStore({
  reducer: {
    categories: categoryReducer,
    products: productReducer,
    wishlist: wishlistReducer,
    reviews: reviewReducer, // ✅ added
  },
});
