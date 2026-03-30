import React from 'react';
import ProductCard from '../ProductCard';
import styles from './ProductsGrid.module.css';

/**
 * Универсальный компонент сетки товаров.
 * Принимает массив 'products' и отрисовывает его через ProductCard.
 */
const ProductsGrid = ({ products = [] }) => {
   if (!products || products.length === 0) {
    return <div className={styles.empty_message}>No products found.</div>;
  }

  return (
    <div className={styles.products_grid}>
      {products.map((product) => (
        /* Передаем все свойства продукта (id, title, price, image и т.д.) через spread */
        <ProductCard key={product.id} {...product} />
      ))}
    </div>
  );
};

export default ProductsGrid;