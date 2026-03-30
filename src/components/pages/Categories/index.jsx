import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getZooCategories } from '../../../features/categoriesFeature/categoriesThunks';
import CategoriesList from '../../CategoriesList';
import Loader from '../../ui/Loader';
import styles from './Categories.module.css';

const Categories = () => {
  const dispatch = useDispatch();
  const { list, isLoading, error } = useSelector((state) => state.categories);

  useEffect(() => {
    if (list.length === 0) {
      dispatch(getZooCategories());
    }
  }, [dispatch, list.length]);

  return (
    <section className={styles.categories_page}>
      <h1 className={styles.title}>Categories</h1>

      {isLoading ? (
        <div className="flex_center" style={{ minHeight: '300px' }}>
          <Loader />
        </div>
      ) : error ? (
        <div className="flex_center">
          <p className={styles.error}>Error: {error}</p>
        </div>
      ) : (
        <CategoriesList categories={list} />
      )}
    </section>
  );
};

export default Categories;