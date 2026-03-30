import { createAsyncThunk } from '@reduxjs/toolkit';
// Импортируем тот же самый db.json
import data from '../../data/db.json';

/**
 * Получение всех категорий (Имитация GET запроса)
 */
export const getZooCategories = createAsyncThunk(
  'categories/getZooCategories',
  async (_, { rejectWithValue }) => {
    try {
      // Имитируем небольшую задержку (400мс), чтобы лоадер "мигнул"
      await new Promise((resolve) => setTimeout(resolve, 400));
      
      // Возвращаем массив категорий из нашего файла
      return data.categories; 
    } catch (error) {
      return rejectWithValue('Не удалось загрузить категории');
    }
  }
);