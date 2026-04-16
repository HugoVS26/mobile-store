import { createBrowserRouter } from 'react-router-dom';
import MobileListPage from '@/pages/MobileListPage/MobileListPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MobileListPage />,
  },
]);

export default router;
