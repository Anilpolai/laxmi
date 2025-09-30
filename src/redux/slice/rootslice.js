import { createSlice, createAsyncThunk, createSelector } from "@reduxjs/toolkit";
import axios from "axios";
import { categoriesData } from "../../jsfile/categoriesData";

// ------------------- CATEGORY SLICE -------------------
const categorySlice = createSlice({
  name: "categories",
  initialState: {
    list: categoriesData,
  },
  reducers: {},
});

// ------------------- PRODUCT SLICE -------------------
export const fetchProducts = createAsyncThunk("products/fetch", async () => {
  const res = await axios.get("http://localhost:3000/api/products");
  return res.data;
});

const productSlice = createSlice({
  name: "products",
  initialState: { list: [], status: "idle", error: null },
  reducers: {
    addProduct: (state, action) => {
      state.list.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

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

// ------------------- REVIEW SLICE -------------------
const reviewSlice = createSlice({
  name: "reviews",
  initialState: {
    reviews: JSON.parse(localStorage.getItem("reviews")) || {},
  },
  reducers: {
    addReview: (state, action) => {
      const { productId, review } = action.payload;
      if (!state.reviews[productId]) {
        state.reviews[productId] = [];
      }
      state.reviews[productId].unshift(review);
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

export const selectReviewsByProduct = createSelector(
  [(state) => state.reviews.reviews, (_, productId) => productId],
  (reviews, productId) => reviews[productId] || []
);

// ------------------- CART SLICE -------------------
const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: Array.isArray(JSON.parse(localStorage.getItem("cart")))
      ? JSON.parse(localStorage.getItem("cart"))
      : [],
  },
  reducers: {
    addToCart: (state, action) => {
      const { id, name, image, price, size, quantity } = action.payload;
      const existing = state.items.find(
        (item) => item.id === id && item.size === size
      );
      if (existing) {
        existing.quantity = Math.max(1, quantity);
      } else {
        state.items.push({ id, name, image, price, size, quantity });
      }
      localStorage.setItem("cart", JSON.stringify(state.items));
    },
    updateQuantity: (state, action) => {
      const { id, size, quantity } = action.payload;
      const existing = state.items.find(
        (item) => item.id === id && item.size === size
      );
      if (existing) {
        existing.quantity = Math.max(1, quantity);
      }
      localStorage.setItem("cart", JSON.stringify(state.items));
    },
    removeFromCart: (state, action) => {
      const { id, size } = action.payload;
      state.items = state.items.filter(
        (item) => !(item.id === id && item.size === size)
      );
      localStorage.setItem("cart", JSON.stringify(state.items));
    },
    clearCart: (state) => {
      state.items = [];
      localStorage.removeItem("cart");
    },
  },
});

// ------------------- ORDERS SLICE -------------------
export const fetchOrders = createAsyncThunk("orders/fetch", async () => {
  const res = await axios.get("http://localhost:3000/api/orders");
  return res.data;
});

const orderSlice = createSlice({
  name: "orders",
  initialState: { list: [], status: "idle", error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

// ------------------- EXPORTS -------------------

// ✅ Category
export const categoryReducer = categorySlice.reducer;

// ✅ Products
export const { addProduct } = productSlice.actions;
export const productReducer = productSlice.reducer;

// ✅ Wishlist
export const { toggleWishlist, removeWishlist, clearWishlist } =
  wishlistSlice.actions;
export const wishlistReducer = wishlistSlice.reducer;

// ✅ Reviews
export const { addReview, clearReviews } = reviewSlice.actions;
export const reviewReducer = reviewSlice.reducer;

// ✅ Cart
export const { addToCart, updateQuantity, removeFromCart, clearCart } =
  cartSlice.actions;
export const cartReducer = cartSlice.reducer;

// ✅ Orders
export const orderReducer = orderSlice.reducer;

// ------------------- SELECTORS -------------------
export const selectAllProducts = (state) => state.products.list;
export const selectProductsByCategory = (state, category) =>
  state.products.list.filter((p) => p.category === category);
export const selectProductById = (state, id) =>
  state.products.list.find((p) => String(p.id) === String(id));

export const selectCartCount = (state) =>
  state.cart.items.reduce((sum, item) => sum + item.quantity, 0);
