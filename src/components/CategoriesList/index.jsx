import React from 'react';
import CategoryCard from '../CategoryCard/index';
import styles from './CategoriesList.module.css';

const CategoriesList = ({ categories = [] }) => {
  return (
    <div className={styles.grid}>
      {categories.map(cat => (
        <CategoryCard
          key={cat.id}
          id={cat.id}
          title={cat.title}
          image={cat.image}
        />
      ))}
    </div>
  );
};

export default CategoriesList;