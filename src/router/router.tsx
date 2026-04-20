import { createBrowserRouter } from 'react-router-dom';
import MobileListPage from '@/pages/MobileListPage/MobileListPage';
import MobileDetailPage from '@/pages/MobileDetailPage/MobileDetailPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MobileListPage />,
  },
  {
    path: '/product/:id',
    element: <MobileDetailPage />,
  },
]);

export default router;
