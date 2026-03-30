import React, { useState } from 'react';
import { useDispatch } from 'react-redux'; // Добавляем диспетчер для вызова санка
import styles from './DiscountForm.module.css';
import Button from '../ui/Button/index';
import discountImg from '../../assets/images/discount-dogs.png';
import Input from '../ui/Input/index';
import { sendDiscountRequest } from '../../features/productsFeature/productsThunks';
import SuccessModal from '../SuccessModal/index';

const DiscountForm = () => {
  const dispatch = useDispatch(); 

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); 

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Устанавливаем статус загрузки, чтобы кнопка изменила текст
    setStatus('loading');

    const userData = { name, phone, email };

    try {
      /**
       * Используем dispatch(sendDiscountRequest(...)).unwrap()
       * .unwrap() нужен для того, чтобы асинхронный экшен пробрасывал ошибку 
       * в блок catch, если сервер ответит неудачей.
       */
      const result = await dispatch(sendDiscountRequest(userData)).unwrap();
      
      console.log("Ответ сервера:", result);

      setStatus('success');
      
      // Очищаем поля после успеха
      setName('');
      setPhone('');
      setEmail('');

      // Открываем модальное окно успеха
      setIsModalOpen(true);
    } catch (error) {
      console.error("Ошибка при отправке:", error);
      setStatus('error');
      alert("Something went wrong. Please try again.");
    } finally {
      // Возвращаем статус в обычное состояние (если нужно) или оставляем success
      if (status !== 'success') setStatus('idle');
    }
  };

  return (
    <section className={styles.discount_section}>
      <SuccessModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Discount Sent!"
        message="We have received your request. Check your email for the discount code!"
      />
      <div className='wrapper'>
        <div className={styles.discount_card}>
          <h2 className={styles.title}>5% off on the first order</h2>
        
          <div className={styles.main_content}> 
            <div className={styles.image_block}>
              <img src={discountImg} alt="Discount Offer" />
            </div>

            <div className={styles.content_block}>
              <form className={`flex_column ${styles.form}`} onSubmit={handleSubmit}>
                <Input 
                  theme="dark" 
                  type="text" 
                  placeholder="Name" 
                  required 
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                />
                <Input 
                  theme="dark" 
                  type="tel" 
                  placeholder="Phone number" 
                  required 
                  value={phone} 
                  onChange={(e) => setPhone(e.target.value)} 
                />
                <Input 
                  theme="dark" 
                  type="email" 
                  placeholder="Email" 
                  required 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                />
                
                {/* Кнопка теперь реагирует на статус загрузки */}
                <Button type="submit" color="white" disabled={status === 'loading'}>
                  {status === 'loading' ? 'Sending...' : 'Get a discount'}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DiscountForm;