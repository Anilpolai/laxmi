// src/redux/store/store.js
import { configureStore } from "@reduxjs/toolkit";
import {
  categoryReducer,   // ✅ singular
  productReducer,
  wishlistReducer,
} from "../slice/rootslice";  // ✅ index.js hai to sirf folder ka naam likho

export const store = configureStore({
  reducer: {
    categories: categoryReducer,  // key tum apni marzi se rakh sakte ho
    products: productReducer,
    wishlist: wishlistReducer,
  },
});
