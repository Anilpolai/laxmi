// src/redux/slices/index.js
import { createSlice, createSelector } from "@reduxjs/toolkit";
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
const allProducts = [
  ...generalProducts.map((p) => ({ ...p, category: "general" })),
  ...kurtiProducts.map((p) => ({ ...p, category: "kurti" })),
];

const productSlice = createSlice({
  name: "products",
  initialState: {
    list: allProducts,
  },
  reducers: {
    addProduct: (state, action) => {
      state.list.push(action.payload);
    },
  },
});

export const { addProduct } = productSlice.actions;

// ✅ Selectors
export const selectAllProducts = (state) => state.products.list;

export const selectProductsByCategory = (state, category) =>
  state.products.list.filter((p) => p.category === category);

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

export const { toggleWishlist, removeWishlist, clearWishlist } =
  wishlistSlice.actions;

// ------------------- REVIEW SLICE -------------------
const reviewSlice = createSlice({
  name: "reviews",
  initialState: {
    // reviews per productId → array
    reviews: JSON.parse(localStorage.getItem("reviews")) || {},
  },
  reducers: {
    addReview: (state, action) => {
      const { productId, review } = action.payload;
      if (!state.reviews[productId]) {
        state.reviews[productId] = [];
      }
      state.reviews[productId].unshift(review);

      // ✅ persist to localStorage
      localStorage.setItem("reviews", JSON.stringify(state.reviews));
    },
    clearReviews: (state, action) => {
      const productId = action.payload;
      if (productId) {
        delete state.reviews[productId];
      } else {
        state.reviews = {};
      }
      localStorage.setItem("reviews", JSON.stringify(state.reviews));
    },
  },
});

export const { addReview, clearReviews } = reviewSlice.actions;

export const selectReviewsByProduct = createSelector(
  [(state) => state.reviews.reviews, (_, productId) => productId],
  (reviews, productId) => reviews[productId] || []
);

// ------------------- EXPORT REDUCERS -------------------
export const categoryReducer = categorySlice.reducer;
export const productReducer = productSlice.reducer;
export const wishlistReducer = wishlistSlice.reducer;
export const reviewReducer = reviewSlice.reducer;
