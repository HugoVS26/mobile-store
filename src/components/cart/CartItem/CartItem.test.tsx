import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CartItem } from './CartItem';
import type { CartItem as CartItemType } from '@/context/CartContext';
import { getCartKey } from '@/context/cartUtils';

const mockItem: CartItemType = {
  id: 'SMG-S24U',
  name: 'Galaxy S24 Ultra',
  brand: 'Samsung',
  imageUrl:
    'http://prueba-tecnica-api-tienda-moviles.onrender.com/images/SMG-S24U-titanium-violet.webp',
  color: 'Titanium Violet',
  storage: '256 GB',
  price: 1229,
};

function renderCartItem(onRemove = vi.fn()): ReturnType<typeof render> {
  return render(<CartItem item={mockItem} onRemove={onRemove} />);
}

describe('Given a CartItem component', () => {
  describe('When rendered', () => {
    it('Should display the product image', () => {
      renderCartItem();

      expect(screen.getByRole('img', { name: 'Samsung Galaxy S24 Ultra' })).toHaveAttribute(
        'src',
        mockItem.imageUrl,
      );
    });

    it('Should display the brand and product name', () => {
      renderCartItem();

      expect(screen.getByText('Samsung Galaxy S24 Ultra')).toBeInTheDocument();
    });

    it('Should display the storage and color specs', () => {
      renderCartItem();

      expect(screen.getByText('256 GB | Titanium Violet')).toBeInTheDocument();
    });

    it('Should display the price in EUR', () => {
      renderCartItem();

      expect(screen.getByText('1229 EUR')).toBeInTheDocument();
    });

    it('Should render a remove button', () => {
      renderCartItem();

      expect(
        screen.getByRole('button', { name: 'Remove Galaxy S24 Ultra from cart' }),
      ).toBeInTheDocument();
    });
  });

  describe('When the remove button is clicked', () => {
    it('Should call onRemove with the correct cart key', async () => {
      const onRemove = vi.fn();
      renderCartItem(onRemove);

      await userEvent.click(
        screen.getByRole('button', { name: 'Remove Galaxy S24 Ultra from cart' }),
      );

      expect(onRemove).toHaveBeenCalledOnce();
      expect(onRemove).toHaveBeenCalledWith(getCartKey(mockItem));
    });
  });
});
