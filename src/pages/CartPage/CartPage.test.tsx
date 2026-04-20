import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import type { ReactNode, JSX } from 'react';
import { CartProvider } from '@/context/CartProvider';
import { useCart } from '@/hooks/useCart';
import type { CartItem } from '@/context/CartContext';
import CartPage from './CartPage';

const mockItem: CartItem = {
  id: 'SMG-S24U',
  name: 'Galaxy S24 Ultra',
  brand: 'Samsung',
  imageUrl:
    'http://prueba-tecnica-api-tienda-moviles.onrender.com/images/SMG-S24U-titanium-violet.webp',
  color: 'Titanium Violet',
  storage: '256 GB',
  price: 1229,
};

function wrapper({ children }: { children: ReactNode }): JSX.Element {
  return (
    <CartProvider>
      <MemoryRouter>{children}</MemoryRouter>
    </CartProvider>
  );
}

function renderCartPage(): ReturnType<typeof render> {
  return render(<CartPage />, { wrapper });
}

function CartPageWithItem(): JSX.Element {
  const { addItem } = useCart();
  return (
    <button onClick={() => addItem(mockItem)} data-testid="add-item">
      add
    </button>
  );
}

function renderCartPageWithItems(): ReturnType<typeof render> {
  return render(
    <>
      <CartPageWithItem />
      <CartPage />
    </>,
    { wrapper },
  );
}

describe('Given a CartPage', () => {
  describe('When the cart is empty', () => {
    it('Should display a continue shopping link pointing to /', () => {
      renderCartPage();

      const link = screen.getByRole('link', { name: 'CONTINUE SHOPPING' });
      expect(link).toHaveAttribute('href', '/');
    });

    it('Should not render any cart items', () => {
      renderCartPage();

      expect(screen.queryByRole('article')).not.toBeInTheDocument();
    });
  });

  describe('When the cart has items', () => {
    it('Should display the item in the list', async () => {
      renderCartPageWithItems();

      await userEvent.click(screen.getByTestId('add-item'));

      expect(screen.getByText('Samsung Galaxy S24 Ultra')).toBeInTheDocument();
    });

    it('Should display the total price', async () => {
      renderCartPageWithItems();

      await userEvent.click(screen.getByTestId('add-item'));

      expect(screen.getByText('TOTAL')).toBeInTheDocument();
      expect(screen.getAllByText('1229 EUR').length).toBeGreaterThanOrEqual(1);
    });

    it('Should remove the item when the remove button is clicked', async () => {
      renderCartPageWithItems();

      await userEvent.click(screen.getByTestId('add-item'));
      await userEvent.click(
        screen.getByRole('button', { name: 'Remove Galaxy S24 Ultra from cart' }),
      );

      expect(screen.queryByText('Samsung Galaxy S24 Ultra')).not.toBeInTheDocument();
    });
  });
});
