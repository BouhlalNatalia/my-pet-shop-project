import React from 'react';
import { Link } from 'react-router-dom';
import styles from './CategoryCard.module.css';

const CategoryCard = ({ id, title, image }) => {
  // ФИКС ПУТИ К КАРТИНКЕ:
  // 1. Берем базовый путь из Vite (напр. /my-pet-shop-project/)
  const baseUrl = import.meta.env.BASE_URL || '/';
  
  // 2. Очищаем путь от лишних начальных слешей и склеиваем
  const cleanImagePath = image.startsWith('/') ? image.slice(1) : image;
  const imageUrl = `${baseUrl}${cleanImagePath}`.replace(/\/+/g, '/');

  return (
    <Link to={`/categories/${id}`} className={styles.card}>
      <div className={styles.image_wrapper}>
        {/* Используем наш исправленный абсолютный путь */}
        <img src={imageUrl} alt={title} className={styles.category_image} />
      </div>
      <p className={styles.title}>{title}</p>
    </Link>
  );
};

export default CategoryCard;