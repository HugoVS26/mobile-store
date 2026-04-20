import type { JSX } from 'react';
import { RouterProvider } from 'react-router-dom';
import { CartProvider } from '@/context/CartProvider';
import router from '@/router/router';

function App(): JSX.Element {
  return (
    <CartProvider>
      <RouterProvider router={router} />
    </CartProvider>
  );
}

export default App;
