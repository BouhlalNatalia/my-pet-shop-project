import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Оставляем items, как у тебя было
  },
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;
      const addedCount = Number(product.count) || 1;
      const existingItem = state.items.find(item => item.id === product.id);

      if (existingItem) {
        // ИСПРАВЛЕНИЕ: если мы на странице товара, мы хотим УСТАНОВИТЬ число, 
        // а не прибавлять его бесконечно.
        existingItem.count = addedCount; 
      } else {
        state.items.push({ ...product, count: addedCount });
      }
    },
    
    incrementCount: (state, action) => {
      const item = state.items.find(item => item.id === action.payload);
      if (item) item.count += 1;
    },
  
    decrementCount: (state, action) => {
      const item = state.items.find(item => item.id === action.payload);
      if (item) {
        if (item.count > 1) {
          item.count -= 1;
        } else {
          state.items = state.items.filter(i => i.id !== action.payload);
        }
      }
    },
    
    removeFromCart: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    
    clearCart: (state) => {
      state.items = [];
    }
  },
});

export const { addToCart, incrementCount, decrementCount, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;