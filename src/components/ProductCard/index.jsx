import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../features/cartFeature/cartSlice';
import styles from './ProductCard.module.css';
import Badge from '../ui/Badge/index';
import Button from '../ui/Button/index';

const ProductCard = ({ id, title, image, price, discont_price }) => {
  const dispatch = useDispatch();

  // 1. Расчет процента скидки
  const discount = discont_price
    ? Math.round(((price - discont_price) / price) * 100)
    : null;

  // 2. ФИКС ПУТИ К КАРТИНКЕ
  // import.meta.env.BASE_URL берется из vite.config.js (там должно быть '/my-pet-shop-project/')
  const baseUrl = import.meta.env.BASE_URL || '/';
  
  // Очищаем путь: убираем лишние слеши в начале image, если они есть, и склеиваем
  const cleanImagePath = image.startsWith('/') ? image.slice(1) : image;
  const imageUrl = `${baseUrl}${cleanImagePath}`.replace(/\/+/g, '/');

  const handleAddToCart = (e) => {
    // Останавливаем переход по ссылке при клике на кнопку
    e.preventDefault();
    e.stopPropagation();

    const productData = {
      id,
      title,
      image,
      price,
      discont_price,
      count: 1,
    };

    dispatch(addToCart(productData));
  };

  return (
    <div className={styles.card_wrapper}>
      {/* Ссылка на страницу конкретного товара */}
      <Link to={`/product/${id}`} className={styles.card}>
        <div className={`${styles.image_wrapper} flex_center`}>
          
          {/* Используем наш исправленный imageUrl */}
          <img src={imageUrl} alt={title} className={styles.product_image} />

          {/* Плашка со скидкой */}
          {discount && (
            <div className={styles.badge_pos}>
              <Badge>-{discount}%</Badge>
            </div>
          )}

          {/* Кнопка добавления в корзину (появляется при ховере в CSS) */}
          <div className={styles.add_to_cart_btn}>
            <Button
              onClick={handleAddToCart}
              color="blueToBlack"
              style={{ width: '100%' }}
            >
              Add to cart
            </Button>
          </div>
        </div>

        <div className={styles.info}>
          <p className={styles.title}>{title}</p>
          <div className={styles.price_block}>
            <span className={styles.current_price}>
              ${discont_price ? discont_price : price}
            </span>
            {discont_price && (
              <span className={styles.old_price}>${price}</span>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;