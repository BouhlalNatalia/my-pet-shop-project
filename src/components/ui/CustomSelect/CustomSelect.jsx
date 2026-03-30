import React, { useState, useRef, useEffect } from 'react';
import styles from './CustomSelect.module.css';

const CustomSelect = ({ options, value, onChange, placeholder = "Select option" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef(null);

  // Находим выбранную опцию для отображения в заголовке
  const selectedOption = options.find(option => option.value === value);

  // Обработчик выбора опции
  const handleOptionClick = (optionValue) => {
    onChange(optionValue);
    setIsOpen(false); // Закрываем меню после выбора
  };

  // Переключатель открытия/закрытия меню
  const toggleDropdown = () => {
    setIsOpen(prevState => !prevState);
  };

  // Закрытие меню при клике вне компонента (Click Outside)
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className={styles.selectContainer} ref={selectRef}>
      {/* Заголовок селекта (то, что всегда видно) */}
      <div 
        className={`${styles.selectHeader} ${isOpen ? styles.open : ''}`} 
        onClick={toggleDropdown}
      >
        <span className={styles.selectedLabel}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        {/* Кастомная стрелочка */}
        <span className={styles.arrowIcon}></span>
      </div>

      {/* Выпадающий список (показывается только если isOpen === true) */}
      {isOpen && (
        <ul className={styles.selectList}>
          {options.map((option) => (
            <li 
              key={option.value} 
              className={`${styles.selectItem} ${value === option.value ? styles.active : ''}`}
              onClick={() => handleOptionClick(option.value)}
            >
              {option.label}
            </li>
          )
          )}
        </ul>
      )}
    </div>
  );
};

export default CustomSelect;