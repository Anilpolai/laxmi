import { createSlice } from "@reduxjs/toolkit";
import { products as generalProducts } from "../../jsfile/products";
import { kurti as kurtiProducts } from "../../jsfile/kurti";

const allProducts = [...generalProducts, ...kurtiProducts];

const productSlice = createSlice({
  name: "products",
  initialState: {
    list: allProducts, // now includes kurti + general products
  },
  reducers: {}
});

export const selectProductById = (state, id) =>
  state.products.list.find((p) => String(p.id) === String(id));

export default productSlice.reducer;
