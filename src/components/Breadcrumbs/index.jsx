import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styles from './Breadcrumbs.module.css';

function Breadcrumbs() {
  const location = useLocation();

  const categories = useSelector(state => state.categories.list) || [];
  const products = useSelector(state => state.products.list) || [];

  const pathnames = location.pathname.split('/').filter(Boolean);

  if (location.pathname === '/' || location.pathname === '/cart') {
    return null;
  }

  // Функция для сокращения текста
  const truncate = (text, length = 5) => {
    if (!text) return "";
    return text.length > length ? text.substring(0, length) + "..." : text;
  };

  const renderCrumb = (to, label, isLast) => (
    <React.Fragment key={to}>
      <span className={styles.separator}></span>
      {isLast ? (
        <span className={styles.current}>{truncate(label, 25)}</span>
      ) : (
        <Link to={to} className={styles.item}>{truncate(label, 20)}</Link>
      )}
    </React.Fragment>
  );

  const isProductPage = pathnames.includes('product');
  const isCategoryPage = pathnames.includes('categories') && pathnames.length > 1;
  const lastId = Number(pathnames[pathnames.length - 1]);

  let currentProduct = null;
  let currentCategory = null;

  if (isProductPage) {
    currentProduct = products.find(p => p.id === lastId);
    if (currentProduct) {
      currentCategory = categories.find(c => c.id === currentProduct.categoryId);
    }
  } else if (isCategoryPage) {
    currentCategory = categories.find(c => c.id === lastId);
  }

  return (
    <nav className={styles.breadcrumbs}>
      <div className={styles.list}>
        <Link to="/" className={styles.item}>Main page</Link>

        {(currentCategory || currentProduct) ? (
          <>
            {renderCrumb('/categories', 'Categories', false)}

            {currentCategory && renderCrumb(
              `/categories/${currentCategory.id}`,
              currentCategory.title,
              !currentProduct
            )}

            {currentProduct && renderCrumb(
              `/product/${currentProduct.id}`,
              currentProduct.title,
              true
            )}
          </>
        ) : (
          pathnames.map((segment, index) => {
            const staticNames = {
              'all-products': 'All products',
              'all-sales': 'All sales',
              'categories': 'Categories'
            };

            if (!staticNames[segment]) return null;

            const isLast = index === pathnames.length - 1;
            const to = `/${segment}`;

            return renderCrumb(to, staticNames[segment], isLast);
          })
        )}
      </div>
    </nav>
  );
}

export default Breadcrumbs;