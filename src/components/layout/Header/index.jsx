import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { NavLink, useLocation } from 'react-router-dom';
import logo from "../../../assets/icons/logo.svg";
import basket from "../../../assets/icons/basket_empty.svg";
import styles from './Header.module.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isHomePage = location.pathname === '/';

    useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const cartItems = useSelector(state => state.cart.items || []);
  const totalCount = cartItems.reduce((acc, item) => acc + (Number(item.count) || 0), 0);

  return (
    <header className={`${styles.header_container} ${isHomePage ? styles.noBorder : ''}`}>
      <div className={`wrapper ${styles.header_content}`}>
        
       
        <div className={styles.logo_box}>
          <NavLink to="/">
            <img src={logo} alt="PetShop Logo" className={styles.logo_img} />
          </NavLink>
        </div>
       
        <div className={styles.center_box}>
          <nav className={`${styles.nav} ${isMenuOpen ? styles.navOpen : ''}`}>
            <NavLink to="/" className={({ isActive }) => isActive ? styles.linkActive : styles.link}>Main Page</NavLink>
            <NavLink to="/categories" className={({ isActive }) => isActive ? styles.linkActive : styles.link}>Categories</NavLink>
            <NavLink to="/all-products" className={({ isActive }) => isActive ? styles.linkActive : styles.link}>All products</NavLink>
            <NavLink to="/all-sales" className={({ isActive }) => isActive ? styles.linkActive : styles.link}>All sales</NavLink>
          </nav>

          <div 
            className={`${styles.burger} ${isMenuOpen ? styles.burgerActive : ''}`} 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>

         <div className={styles.cart_box}>
          <NavLink to="/cart" className={styles.cart_link}>
            <div className={styles.cart_container}>
              <img src={basket} alt="Basket" className={styles.basket_icon} />
              {totalCount > 0 && <span className={styles.badge}>{totalCount}</span>}
            </div>
          </NavLink>
        </div>

      </div>
    </header>
  );
};

export default Header;