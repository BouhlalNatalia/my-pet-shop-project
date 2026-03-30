import React from 'react';
import styles from './Footer.module.css';
import iconInsta from '../../../assets/icons/insta.svg';
import iconWhatsapp from '../../../assets/icons/whatsapp.svg';


const Footer = () => {
  return (
    <footer className='wrapper'>

      <div className={styles.footer_section}>

        <h2 className={styles.title}>Contact</h2>

        <div className={styles.content}>
          {/* Карточка Phone */}
          <div className={styles.card}>
            <p className={styles.label}>Phone</p>
            <a href="tel:+493091588492" className={styles.value}>+49 30 915-88492</a>
          </div>

          {/* Карточка Socials */}
          <div className={`${styles.card} flex_column`}>
            <p className={styles.label}>Socials</p>
            <div className={styles.icons}>
              <a href="https://instagram.com" target="_blank" >
                <img src={iconInsta} alt="Instagram" />
              </a>
              <a href="https://wa.me/493091588492" target="_blank" >
                <img src={iconWhatsapp} alt="WhatsApp" />
              </a>
            </div>
          </div>

          {/* Карточка Address */}
          <div className={styles.card}>
            <p className={styles.label}>Address</p>
            <address className={styles.value}>
              Wallstraße 9–13, 10179 Berlin, Deutschland
            </address>
          </div>

          {/* Карточка Working hours */}
          <div className={styles.card}>
            <p className={styles.label}>Working hours</p>
            <p className={styles.value}>24 hours a day</p>
          </div>
        </div>

        <div className={styles.map}>
          <iframe
            title="map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2427.6322301168273!2d13.40939511580749!3d52.51268497981249!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47a84e2010834161%3A0x6441a14c3e809f6d!2sWallstra%C3%9Fe%209-13%2C%2010179%20Berlin%2C%20Germany!5e0!3m2!1sen!2s!4v1696240000000!5m2!1sen!2s"
            loading="lazy"
            className={styles.iframe}
            style={{ border: 0 }}
            allowFullScreen=""
          />
        </div>


      </div>
    </footer>
  );
};

export default Footer;