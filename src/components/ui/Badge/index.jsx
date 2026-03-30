import React from 'react';
import styles from './Badge.module.css';

const Badge = ({ children }) => {
  return (
    <div className={styles.badge}>
      {children}
    </div>
  );
};

export default Badge;