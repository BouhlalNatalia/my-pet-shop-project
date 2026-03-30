import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  incrementCount,
  decrementCount,
  removeFromCart,
  clearCart
} from '../../../features/cartFeature/cartSlice.js';
import { sendOrderRequest } from '../../../features/orderFeatures/orderThunks.js';
import { resetOrderStatus } from '../../../features/orderFeatures/orderSlice.js';

import Button from '../../ui/Button';
import Input from '../../ui/Input'; // Используем твой кастомный инпут
import SuccessModal from '../../SuccessModal/index';
import styles from './Cart.module.css';

const Cart = () => {
  const { items } = useSelector((state) => state.cart);
  const { isLoading, isError } = useSelector((state) => state.order);
  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);

  // Универсальная функция для формирования пути к картинке
  const getImageUrl = (imagePath) => {
    const baseUrl = import.meta.env.BASE_URL || '/';
    const cleanPath = imagePath.startsWith('/') ? imagePath.slice(1) : imagePath;
    return `${baseUrl}${cleanPath}`.replace(/\/+/g, '/');
  };

  const handleOrder = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const orderData = {
      name: formData.get('Name'),
      phone: formData.get('Phone number'),
      email: formData.get('Email'),
      products: items,
    };

    try {
      await dispatch(sendOrderRequest(orderData)).unwrap();
      setIsModalOpen(true);
      dispatch(clearCart());
      e.target.reset();
    } catch (error) {
      console.error(`Order error: ${error}`);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    dispatch(resetOrderStatus());
  };

  const totalItems = items.reduce((acc, item) => acc + (Number(item.count) || 0), 0);
  const totalPrice = items.reduce((acc, item) => {
    const price = item.discont_price || item.price;
    return acc + price * (item.count || 1);
  }, 0);

  // Рендер для пустой корзины
  if (items.length === 0) {
    return (
      <div className={styles.empty_cart}>
        <SuccessModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          title="Congratulations!"
          message="Your order has been successfully placed on the website."
        />
        <div className={styles.title_container}>
          <h2 className={styles.title}>Shopping cart</h2>
          <div className={styles.line}></div>
          <Link to="/all-products" className={styles.back_link}>Back to the store</Link>
        </div>
        <div className={styles.empty_content}>
          <p>Looks like you have no items in your basket currently.</p>
          <Link to="/all-products">
            <Button>Continue Shopping</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <SuccessModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title="Congratulations!"
        message="Your order has been successfully placed on the website."
      />

      <div className={styles.title_container}>
        <h2 className={styles.title}>Shopping cart</h2>
        <div className={styles.line}></div>
        <Link to="/all-products" className={styles.back_link}>Back to the store</Link>
      </div>

      <div className={styles.container}>
        <div className={styles.items_section}>
          {items.map((item) => (
            <div key={item.id} className={styles.item_card}>
              <div className={styles.image_wrapper}>
                <img
                  src={getImageUrl(item.image)}
                  alt={item.title}
                  className={styles.item_image}
                />
              </div>

              <div className={styles.item_info}>
                <div className={styles.item_header}>
                  <p className={styles.item_title}>{item.title}</p>
                  <button
                    className={styles.delete_btn}
                    onClick={() => dispatch(removeFromCart(item.id))}
                  >
                    ✕
                  </button>
                </div>

                <div className={styles.item_footer}>
                  <div className={styles.counter}>
                    <button onClick={() => dispatch(decrementCount(item.id))}>−</button>
                    <span>{item.count}</span>
                    <button onClick={() => dispatch(incrementCount(item.id))}>+</button>
                  </div>

                  <div className={styles.price_block}>
                    <span className={styles.current_price}>
                      ${((item.discont_price || item.price) * item.count).toFixed(2)}
                    </span>
                    {item.discont_price && (
                      <span className={styles.old_price}>
                        ${(item.price * item.count).toFixed(2)}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.order_section}>
          <h3>Order details</h3>
          <p className={styles.items_count_text}>{totalItems} items</p>

          <div className={styles.total_row}>
            <span className={styles.total_label}>Total</span>
            <span className={styles.total_sum}>${totalPrice.toFixed(2)}</span>
          </div>

          <form className={styles.order_form} onSubmit={handleOrder}>
            <Input name="Name" placeholder="Name" required theme="light" />
            <Input name="Phone number" placeholder="Phone number" required theme="light" />
            <Input name="Email" placeholder="Email" required theme="light" />

            {isError && <p className={styles.error_message}>{isError}</p>}

            <Button
              type="submit"
              disabled={isLoading}
              style={{ width: '100%', marginTop: '16px' }}
            >
              {isLoading ? 'Sending...' : 'Order'}
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Cart;