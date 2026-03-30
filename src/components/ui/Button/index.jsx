import React from 'react';
import styles from './Button.module.css';

const Button = ({ children, onClick, color = 'blue', ...props }) => {
    // Выбираем нужный класс из CSS-модуля на основе пропа color
    const btnClass = `${styles.btn} ${styles[color]}`;

    return (
        <button 
            className={btnClass} 
            onClick={onClick}
            {...props} 
        >
            {children}
        </button>
    );
};

export default Button;