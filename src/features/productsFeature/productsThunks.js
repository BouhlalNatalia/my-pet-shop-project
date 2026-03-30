import { createAsyncThunk } from '@reduxjs/toolkit';
import data from '../../data/db.json';

export const getZooProducts = createAsyncThunk(
  'products/getZooProducts',
  async (_, { rejectWithValue }) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      if (!data.products) throw new Error('Данные о товарах отсутствуют');
      return data.products; 
    } catch (error) {
      return rejectWithValue(error.message || 'Не удалось загрузить товары');
    }
  }
);

export const sendDiscountRequest = createAsyncThunk(
  'products/sendDiscountRequest',
  async (userData, { rejectWithValue }) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 800));
      return { status: 'OK', message: 'Discount applied successfully!' };
    } catch (error) {
      return rejectWithValue('Ошибка при отправке заявки');
    }
  }
);

export const sendOrderRequest = createAsyncThunk(
  'order/sendOrderRequest', 
  async (orderData, { rejectWithValue }) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return { status: 'OK', message: 'Order placed!' };
    } catch (error) {
      return rejectWithValue('Ошибка при оформлении заказа');
    }
  }
);