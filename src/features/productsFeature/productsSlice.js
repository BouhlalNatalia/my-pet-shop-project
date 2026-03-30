import { createSlice } from '@reduxjs/toolkit';
import { getZooProducts, sendDiscountRequest } from './productsThunks';

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    list: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getZooProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getZooProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.list = action.payload;
      })
      .addCase(getZooProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export default productsSlice.reducer;