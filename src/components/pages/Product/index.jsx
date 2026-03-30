import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getZooProducts } from '../../../features/productsFeature/productsThunks';
import { addToCart } from '../../../features/cartFeature/cartSlice';
import Loader from '../../ui/Loader';
import Button from '../../ui/Button';
import styles from './Product.module.css';

const TEXT_LIMIT = 300;

const Product = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  // Достаем данные из стора
  const { list, isLoading } = useSelector((state) => state.products);
  
  // ДОБАВЛЕНА ЗАЩИТА: используем опциональную цепочку ?.
  // Если state.cart или items еще не загрузились, find не вызовет ошибку
  const cartItem = useSelector((state) => 
    state.cart?.items?.find((item) => item.id === Number(id))
  );

  const [count, setCount] = useState(1);
  const [isExpanded, setIsExpanded] = useState(false);

  // Ищем сам продукт в общем списке
  const product = list?.find((item) => item.id === Number(id));

  // Синхронизация с корзиной
  useEffect(() => {
    if (cartItem) {
      setCount(cartItem.count);
    }
  }, [cartItem]);

  // Загрузка данных, если их нет
  useEffect(() => {
    if (list.length === 0) {
      dispatch(getZooProducts());
    }
  }, [dispatch, list.length]);

  if (isLoading) return <div className="flex_center" style={{ minHeight: '400px' }}><Loader /></div>;
  if (!product) return <div className="wrapper">Product not found</div>;

  // Формирование пути к картинке
  const baseUrl = import.meta.env.BASE_URL || '/my-pet-shop-project/';
  const cleanImagePath = product.image.replace(/^\//, '');
  const imageUrl = `${baseUrl}${cleanImagePath}`.replace(/\/+/g, '/');

  const hasDiscount = product.discont_price !== null;
  const finalPrice = hasDiscount ? product.discont_price : product.price;

  const handleAddToCart = () => {
    if (product) {
      const nextCount = count + 1;
      setCount(nextCount);
      dispatch(addToCart({ ...product, count: nextCount }));
    }
  };

  const increment = () => setCount(prev => prev + 1);
  const decrement = () => setCount(prev => (prev > 1 ? prev - 1 : 1));

  const description = product.description || "";
  const isLongDescription = description.length > TEXT_LIMIT;
  const displayedText = isExpanded ? description : description.slice(0, TEXT_LIMIT);

  return (
    <main className="wrapper">
      <div className={styles.product_container}>
        <h2 className={styles.mobile_title}>{product.title}</h2>
        <div className={`${styles.image_block} flex_center`}>
          <img src={imageUrl} alt={product.title} />
        </div>
        <div className={styles.info_block}>
          <h2 className={styles.desktop_title}>{product.title}</h2>
          <div className={styles.price_section}>
            <span className={styles.current_price}>${finalPrice}</span>
            {hasDiscount && (
              <div className={styles.old_price_group}>
                <span className={styles.old_price}>${product.price}</span>
                <span className={styles.discount_badge}>
                  -{Math.round(((product.price - product.discont_price) / product.price) * 100)}%
                </span>
              </div>
            )}
          </div>
          <div className={styles.actions}>
            <div className={styles.counter}>
              <button onClick={decrement} type="button">−</button>
              <span>{count}</span>
              <button onClick={increment} type="button">+</button>
            </div>
            <Button onClick={handleAddToCart} style={{ flex: 1 }}>
              Add to cart
            </Button>
          </div>
          <div className={styles.description}>
            <h3>Description</h3>
            <p className={styles.description_text}>
              {displayedText}
              {!isExpanded && isLongDescription && "..."}
            </p>
            {isLongDescription && (
              <button className={styles.read_more_btn} onClick={() => setIsExpanded(!isExpanded)}>
                {isExpanded ? "Read less" : "Read more"}
              </button>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Product;