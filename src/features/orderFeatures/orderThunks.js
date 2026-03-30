import { createAsyncThunk } from '@reduxjs/toolkit';

// Мы убираем axios и BASE_URL, так как на GitHub Pages нет бэкенда
export const sendOrderRequest = createAsyncThunk(
  'order/sendOrderRequest', 
  async (orderData, { rejectWithValue }) => {
    try {
      // 1. Имитируем задержку сети (например, 1.5 секунды)
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // 2. Выводим данные в консоль, чтобы ты могла проверить, что улетает
      console.log("Данные заказа отправлены (имитация):", orderData);

      // 3. Возвращаем фейковый успешный ответ от сервера
      return { status: 'OK', message: 'Order placed successfully' };
      
    } catch (error) {
      // На случай, если ты захочешь проверить обработку ошибок, 
      // тут можно выкинуть throw new Error()
      return rejectWithValue('Failed to place order');
    }
  }
);