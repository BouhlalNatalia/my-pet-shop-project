import React from 'react';
import { useSelector } from 'react-redux'; 
import { Link } from 'react-router-dom';
import s from './SalesList.module.css';
import ProductCard from '../ProductCard';
import Button from '../ui/Button';
import Loader from '../ui/Loader';

const SalesList = () => {
  
  const { list, isLoading } = useSelector((state) => state.products);


  const saleProducts = list.filter(item => item.discont_price !== null);


  const displaySales = saleProducts.slice(0, 4);

  return (
    <section className="wrapper">
      <div className={s.sales_section}>
        <div className={`flex_between ${s.header}`}>
          <h2 className={s.title}>Sale</h2>
          <div className={s.line}></div>
          <Link to="/all-sales">
            <Button color="white" style={{ width: 'auto' }}>All sales</Button>
          </Link>
        </div>

        {isLoading ? (
          <div className="flex_center" style={{ padding: '40px 0' }}>
            <Loader />
          </div>
        ) : (
          <div className={s.grid}>
            {displaySales.length > 0 ? (
              displaySales.map(item => (
                <ProductCard key={item.id} {...item} />
              ))
            ) : (
              <p>No sales at the moment</p>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default SalesList;