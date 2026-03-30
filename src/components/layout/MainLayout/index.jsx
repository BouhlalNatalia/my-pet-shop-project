import React from 'react';
/* 1. Импортируем ScrollRestoration */
import { Outlet, useLocation, ScrollRestoration } from 'react-router-dom';
import Header from '../Header/index.jsx';
import Footer from '../Footer/index.jsx';
import Breadcrumbs from '../../Breadcrumbs/index.jsx';
import styles from './MainLayout.module.css';

const MainLayout = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <div>
      
      <ScrollRestoration />
      
      <Header />
      <main className={isHomePage ? '' : styles.main_content}>
        <div className="wrapper">
          <Breadcrumbs />
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;