import React, { useEffect, useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getZooProducts } from '../../../features/productsFeature/productsThunks';
import ProductsGrid from '../../ProductsGrid';
import Loader from '../../ui/Loader/index';
import FilterBar from '../../FilterBar/index';
import styles from './Sales.module.css';

const Sales = () => {
  const dispatch = useDispatch();
  const { list, isLoading } = useSelector((state) => state.products);

  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [sortType, setSortType] = useState('default');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (list.length === 0) {
      dispatch(getZooProducts());
    }
  }, [dispatch, list.length]);

  // ОСНОВНАЯ ЛОГИКА ФИЛЬТРАЦИИ
  const processedSales = useMemo(() => {
    // 1. Оставляем только те товары, у которых есть discont_price
    let result = list.filter(product => product.discont_price !== null);

    // 2. Фильтр по цене (смотрим ТОЛЬКО на discont_price, так как это распродажа)
    if (minPrice !== '') {
      result = result.filter(p => p.discont_price >= Number(minPrice));
    }
    if (maxPrice !== '') {
      result = result.filter(p => p.discont_price <= Number(maxPrice));
    }

    // 3. Сортировка (делаем копию через [...result], чтобы не менять оригинал в Store)
    const sortedResult = [...result];

    if (sortType === 'price-asc') {
      sortedResult.sort((a, b) => a.discont_price - b.discont_price);
    } else if (sortType === 'price-desc') {
      sortedResult.sort((a, b) => b.discont_price - a.discont_price);
    }

    return sortedResult;
  }, [list, minPrice, maxPrice, sortType]);

  return (
    <section className={styles.sales_section}>
      <div className={styles.header_block}>
        <h2 className={styles.title}>Discounted items</h2>
        
        {/* Бургер для фильтров (мобильная версия) */}
        <div
          className={`${styles.burger_btn} ${isMenuOpen ? styles.burger_active : ''}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>

      <div className={`${styles.filters_wrapper} ${isMenuOpen ? styles.show : ''}`}>
        <FilterBar
          minPrice={minPrice} setMinPrice={setMinPrice}
          maxPrice={maxPrice} setMaxPrice={setMaxPrice}
          sort={sortType} setSort={setSortType}
          hideDiscountCheckbox={true} // Чекбокс тут не нужен
        />
      </div>

      {isLoading ? (
        <div className="flex_center" style={{ minHeight: '300px' }}>
          <Loader />
        </div>
      ) : (
        <div className={styles.grid_container}>
          {processedSales.length > 0 ? (
            <ProductsGrid products={processedSales} />
          ) : (
            <p className={styles.no_results}>No sale items found for these criteria.</p>
          )}
        </div>
      )}
    </section>
  );
};

export default Sales;