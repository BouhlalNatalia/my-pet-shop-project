import React from 'react';
import styles from './Input.module.css';

const Input = ({ theme = 'dark', ...props }) => {
  // Выбираем стиль: для синего фона или для белого
  const themeClass = theme === 'light' ? styles.light : styles.dark;

  return (
    <input 
      className={`${styles.input} ${themeClass}`} 
      {...props} // Здесь пролетают name, placeholder, onChange, value и т.д.
    />
  );
};

export default Input;