import { createAsyncThunk } from '@reduxjs/toolkit';

export const sendOrderRequest = createAsyncThunk(
  'cart/sendOrderRequest',
  async (orderData, { rejectWithValue }) => {
    try {
      // Имитируем задержку сети 1 секунду
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      console.log("Order sent to 'server':", orderData);
      
      // Возвращаем фейковый успешный ответ
      return { status: 'OK', message: 'Order placed successfully' };
    } catch (error) {
      return rejectWithValue('Failed to place order');
    }
  }
);