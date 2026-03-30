import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './NotFound.module.css';
import dogImg from '../../../assets/images/404-dog.png';
import DigitFour from './DigitFour';
import { useNavigate } from 'react-router-dom';
import Button from '../../ui/Button/index'; 

const NotFound = () => {
  const navigate = useNavigate(); 

  const handleGoHome = () => {
    navigate('/'); 
  };
  
  return (
    <section className={styles.not_found}>
      <div className={styles.container}>

        <div className={styles.error_code}>
          <DigitFour />
          <img src={dogImg} alt="Cute dog" className={styles.dog_image} />
          <DigitFour />
        </div>

        <h1 className={styles.title}>Page Not Found</h1>
        <p className={styles.description}>
          We’re sorry, the page you requested could not be found.<br />
          Please go back to the homepage.
        </p>

      <Button onClick={handleGoHome}>
        Go Home
      </Button>
      </div>
    </section>
  );
};

export default NotFound;