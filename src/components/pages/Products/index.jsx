import React, { useEffect, useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getZooProducts } from '../../../features/productsFeature/productsThunks';
import { getZooCategories } from '../../../features/categoriesFeature/categoriesThunks';
import ProductsGrid from '../../ProductsGrid';
import Loader from '../../ui/Loader';
import styles from './Products.module.css';
import FilterBar from '../../FilterBar/index';

const Products = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { list: allProducts, isLoading } = useSelector((state) => state.products);
  const { list: allCategories } = useSelector((state) => state.categories);

  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [isDiscounted, setIsDiscounted] = useState(false);
  const [sortType, setSortType] = useState('default');
  
  // Состояние для мобильного меню фильтров (бургер)
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (allProducts.length === 0) dispatch(getZooProducts());
    if (allCategories.length === 0) dispatch(getZooCategories());
  }, [dispatch, allProducts.length, allCategories.length]);

  // ОСНОВНАЯ ЛОГИКА ФИЛЬТРАЦИИ И СОРТИРОВКИ
  const displayProducts = useMemo(() => {
    // 1. Сначала фильтруем по категории (если id передан в URL)
    let result = id
      ? allProducts.filter(item => item.categoryId === Number(id))
      : [...allProducts];

    // 2. Фильтр по минимальной цене
    if (minPrice !== '') {
      result = result.filter(p => (p.discont_price ?? p.price) >= Number(minPrice));
    }

    // 3. Фильтр по максимальной цене
    if (maxPrice !== '') {
      result = result.filter(p => (p.discont_price ?? p.price) <= Number(maxPrice));
    }

    // 4. Фильтр только товаров со скидкой
    if (isDiscounted) {
      result = result.filter(p => p.discont_price !== null);
    }

    // 5. Сортировка (делаем копию, чтобы не менять оригинал в Store)
    const sortedResult = [...result];

    if (sortType === 'price-asc') {
      sortedResult.sort((a, b) => (a.discont_price ?? a.price) - (b.discont_price ?? b.price));
    } else if (sortType === 'price-desc') {
      sortedResult.sort((a, b) => (b.discont_price ?? b.price) - (a.discont_price ?? a.price));
    } 

    return sortedResult;
  }, [allProducts, id, minPrice, maxPrice, isDiscounted, sortType]);

  // Динамический заголовок страницы
  let pageTitle = "All Products";
  if (id) {
    const currentCategory = allCategories.find(cat => cat.id === Number(id));
    if (currentCategory) pageTitle = currentCategory.title;
  }

  return (
    <div className={styles.products_page}>
      <div className={styles.header_row}>
        <h1 className={styles.title}>{pageTitle}</h1>
        
        {/* Бургер-кнопка для фильтров на мобилках */}
        <div 
          className={`${styles.burger_btn} ${isMenuOpen ? styles.burger_active : ''}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>

      {/* Обертка фильтров с классом показа для мобильной версии */}
      <div className={`${styles.filters_wrapper} ${isMenuOpen ? styles.show : ''}`}>
        <FilterBar
          minPrice={minPrice} setMinPrice={setMinPrice}
          maxPrice={maxPrice} setMaxPrice={setMaxPrice}
          isDiscount={isDiscounted} setIsDiscount={setIsDiscounted}
          sort={sortType} setSort={setSortType}
        />
      </div>

      {isLoading ? (
        <div className="flex_center" style={{ minHeight: '300px' }}>
          <Loader />
        </div>
      ) : (
        <div className={styles.grid_container}>
          {displayProducts.length > 0 ? (
            <ProductsGrid products={displayProducts} />
          ) : (
            <p className={styles.no_products}>No products found matching your criteria.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Products;