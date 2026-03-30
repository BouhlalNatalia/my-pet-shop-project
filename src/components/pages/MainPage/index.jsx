import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { getZooCategories } from '../../../features/categoriesFeature/categoriesThunks';
import { getZooProducts } from '../../../features/productsFeature/productsThunks';
import styles from './MainPage.module.css';
import Button from "../../ui/Button/index";
import DiscountForm from '../../DiscountForm/index';
import CategoriesList from '../../CategoriesList';
import ProductsGrid from '../../ProductsGrid';
import Loader from '../../ui/Loader';

const MainPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { list: allCategories, isLoading: catLoading } = useSelector((state) => state.categories);
  const { list: allProducts, isLoading: prodLoading } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getZooCategories());
    dispatch(getZooProducts());
  }, [dispatch]);

  const categoriesToDisplay = allCategories.slice(0, 4);
  const salesToDisplay = allProducts
    .filter(p => p.discont_price !== null)
    .slice(0, 4);

  return (
    <>
      {/* 1. Hero Section */}
      <section className={styles.hero_section_container}>
        <div className={`wrapper ${styles.hero_box}`}>
          <div className={styles.hero_content}>
            <h1 className={styles.hero_title}>Amazing Discounts on Pets Products!</h1>
            <Button onClick={() => navigate('/all-sales')}>Check out</Button>
          </div>
        </div>
      </section>

      {/* 2. Секция категорий */}
      <section className="wrapper">
        <div className={styles.section_header}>
          <h2 className={styles.section_title}>Categories</h2>
          <div className={styles.line}></div>
          <Link to="/categories" className={styles.desktop_btn}>
            <Button color="lineBtn" style={{ width: 'auto' }}>All categories</Button>
          </Link>
        </div>

        {/* Проверка загрузки категорий */}
        {catLoading ? (
          <div className="flex_center" style={{ minHeight: '200px' }}>
            <Loader />
          </div>
        ) : (
          <CategoriesList categories={categoriesToDisplay} />
        )}

        <Link to="/categories" className={styles.mobile_btn}>
          <Button color="lineBtn" style={{ width: '100%' }}>All categories</Button>
        </Link>
      </section>

      {/* 3. Форма */}
      <DiscountForm />

      {/* 4. Секция распродажи */}
      <section className="wrapper">
        <div className={styles.section_header}>
          <h2 className={styles.section_title}>Sale</h2>
          <div className={styles.line}></div>

          <Link to="/all-sales" className={styles.desktop_btn}>
            <Button color="lineBtn" style={{ width: 'auto' }}>All sales</Button>
          </Link>
        </div>

        {/* Проверка загрузки товаров */}
        {prodLoading ? (
          <div className="flex_center" style={{ minHeight: '200px' }}>
            <Loader />
          </div>
        ) : (
          <ProductsGrid products={salesToDisplay} />
        )}

        <Link to="/all-sales" className={styles.mobile_btn}>
          <Button color="lineBtn" style={{ width: '100%' }}>All sales</Button>
        </Link>
      </section>
    </>
  );
};

export default MainPage;