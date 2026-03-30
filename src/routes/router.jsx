import { createHashRouter } from 'react-router-dom';

// Импортируем лейаут и страницы
import MainLayout from '../components/layout/MainLayout';
import MainPage from '../components/pages/MainPage';
import Categories from '../components/pages/Categories';
import Products from '../components/pages/Products';
import Product from '../components/pages/Product';
import Sales from '../components/pages/Sales';
import Cart from '../components/pages/Cart';
import NotFound from '../components/pages/NotFound';

export const router = createHashRouter([
  {
    path: '/',
    element: <MainLayout />, 
    children: [
      { 
        path: '/', 
        element: <MainPage /> 
      },
      { 
        path: 'categories', 
        element: <Categories /> 
      },
      { 
        path: 'categories/:id', 
        element: <Products /> 
      },
      { 
        path: 'all-products', 
        element: <Products /> 
      },
      { 
        path: 'all-sales', 
        element: <Sales /> 
      },
      { 
        path: 'product/:id', 
        element: <Product /> 
      },
      { 
        path: 'cart', 
        element: <Cart /> 
      },
      { 

        path: '*', 
        element: <NotFound /> 
      },
    ],
  },
]);
