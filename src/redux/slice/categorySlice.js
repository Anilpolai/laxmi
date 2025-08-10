import { createSlice } from '@reduxjs/toolkit';
import { categoriesData } from '../../js file/categoriesData';

const initialState = {
  list: categoriesData, // ✅ fetched from JS file
};

const categorySlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {}
});

export default categorySlice.reducer;
