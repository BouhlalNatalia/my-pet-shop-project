import React from 'react';
import styles from './SuccessModal.module.css';

const SuccessModal = ({ 
  isOpen, 
  onClose, 
  title = "Congratulations!", 
  message = "Your order has been successfully placed on the website." 
}) => {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.close_btn} onClick={onClose}>✕</button>
        <div className={styles.content}>
          <h2>{title}</h2>
          <p>{message}</p>
         
          {title === "Congratulations!" && (
             <p>A manager will contact you shortly to confirm your order.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;