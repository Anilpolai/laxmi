import { configureStore } from "@reduxjs/toolkit";
import {
  categoryReducer,
  productReducer,
  wishlistReducer,
  reviewReducer,
  cartReducer,
  orderReducer,
} from "../slice/rootslice";

const store = configureStore({
  reducer: {
    categories: categoryReducer,
    products: productReducer,
    wishlist: wishlistReducer,
    reviews: reviewReducer,
    cart: cartReducer,
    orders: orderReducer,
  },
});

export default store;
