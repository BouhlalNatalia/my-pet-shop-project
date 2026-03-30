import React, { useState, useRef, useEffect } from 'react';
import styles from './FilterBar.module.css';

function FilterBar({ 
  minPrice, setMinPrice, 
  maxPrice, setMaxPrice, 
  isDiscount, setIsDiscount, 
  sort, setSort, 
  hideDiscountCheckbox 
}) {
  const [isSortOpen, setIsSortOpen] = useState(false);
  const sortRef = useRef(null);

  const sortOptions = [
    { value: 'default', label: 'by default' },
    { value: 'price-asc', label: 'price low to high' },
    { value: 'price-desc', label: 'price high to low' }
  ];

  // Находим текущий текст для отображения
  const currentSortLabel = sortOptions.find(opt => opt.value === sort)?.label || 'by default';

  // Закрытие при клике вне селекта
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sortRef.current && !sortRef.current.contains(event.target)) {
        setIsSortOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={styles.filters}>
      
      {/* Блок цены */}
      <div className={styles.filter_item}>
        <span>Price</span>
        <div className={styles.inputs_group}> 
          <input
            type="number"
            placeholder="from"
            className={styles.input}
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
          />
          <input
            type="number"
            placeholder="to"
            className={styles.input}
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
          />
        </div>
      </div>

      {/* Чекбокс скидки */}
      {!hideDiscountCheckbox && (
        <div className={styles.filter_item}>
          <span>Discounted items</span>
          <input
            type="checkbox"
            className={styles.checkbox}
            checked={isDiscount}
            onChange={(e) => setIsDiscount(e.target.checked)}
          />
        </div>
      )}

      {/* Кастомный Sorted */}
      <div className={styles.filter_item} ref={sortRef}>
        <span>Sorted</span>
        <div className={styles.customSelectContainer}>
          <div 
            className={`${styles.selectHeader} ${isSortOpen ? styles.open : ''}`} 
            onClick={() => setIsSortOpen(!isSortOpen)}
          >
            {currentSortLabel}
            <span className={styles.arrow}></span>
          </div>

          {isSortOpen && (
            <ul className={styles.selectList}>
              {sortOptions.map((option) => (
                <li 
                  key={option.value}
                  className={`${styles.selectItem} ${sort === option.value ? styles.active : ''}`}
                  onClick={() => {
                    setSort(option.value);
                    setIsSortOpen(false);
                  }}
                >
                  {option.label}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

    </div>
  );
}

export default FilterBar;