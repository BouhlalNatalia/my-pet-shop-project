import { configureStore } from '@reduxjs/toolkit';
import productsReducer from '../features/productsFeature/productsSlice';
import cartReducer from '../features/cartFeature/cartSlice';
import orderReducer from '../features/orderFeatures/orderSlice';
import categoriesReducer from '../features/categoriesFeature/categoriesSlice';

export const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,
    order: orderReducer,
    categories: categoriesReducer,
  },
});