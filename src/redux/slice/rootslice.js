// src/redux/slices/index.js
import { createSlice } from "@reduxjs/toolkit";
import { categoriesData } from "../../jsfile/categoriesData";
import { products as generalProducts } from "../../jsfile/products";
import { kurti as kurtiProducts } from "../../jsfile/kurti";

// ------------------- CATEGORY SLICE -------------------
const categorySlice = createSlice({
  name: "categories",
  initialState: {
    list: categoriesData,
  },
  reducers: {},
});

// ------------------- PRODUCT SLICE -------------------
const allProducts = [...generalProducts, ...kurtiProducts];

const productSlice = createSlice({
  name: "products",
  initialState: {
    list: allProducts,
  },
  reducers: {},
});

export const selectProductById = (state, id) =>
  state.products.list.find((p) => String(p.id) === String(id));

// ------------------- WISHLIST SLICE -------------------
const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: {
    items: JSON.parse(localStorage.getItem("wishlist")) || [],
  },
  reducers: {
    toggleWishlist: (state, action) => {
      const id = action.payload;
      if (state.items.includes(id)) {
        state.items = state.items.filter((item) => item !== id);
      } else {
        state.items.push(id);
      }
      localStorage.setItem("wishlist", JSON.stringify(state.items));
    },
    removeWishlist: (state, action) => {
      const id = action.payload;
      state.items = state.items.filter((item) => item !== id);
      localStorage.setItem("wishlist", JSON.stringify(state.items));
    },
    clearWishlist: (state) => {
      state.items = [];
      localStorage.removeItem("wishlist");
    },
  },
});

export const {
  toggleWishlist,
  removeWishlist,
  clearWishlist,
} = wishlistSlice.actions;

// ------------------- EXPORT REDUCERS -------------------
export const categoryReducer = categorySlice.reducer;
export const productReducer = productSlice.reducer;
export const wishlistReducer = wishlistSlice.reducer;
