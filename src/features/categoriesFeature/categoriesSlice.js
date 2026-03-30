import { createSlice } from '@reduxjs/toolkit';
import { getZooCategories } from './categoriesThunks';

const categoriesSlice = createSlice({
  name: 'categories',
  initialState: {
    list: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getZooCategories.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getZooCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.list = action.payload;
      })
      .addCase(getZooCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export default categoriesSlice.reducer;