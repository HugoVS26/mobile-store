import { createBrowserRouter } from 'react-router-dom';
import MobileListPage from '@/pages/MobileListPage/MobileListPage';
import MobileDetailPage from '@/pages/MobileDetailPage/MobileDetailPage';
import CartPage from '@/pages/CartPage/CartPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MobileListPage />,
  },
  {
    path: '/product/:id',
    element: <MobileDetailPage />,
  },
  {
    path: '/cart',
    element: <CartPage />,
  },
]);

export default router;
