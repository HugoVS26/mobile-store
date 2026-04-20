import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import type { ReactNode, JSX } from 'react';
import { CartProvider } from '@/context/CartProvider';
import { mockedMobileDetail } from '@/test/mocks/mobiles';
import { MobileDetail } from './MobileDetail';

function wrapper({ children }: { children: ReactNode }): JSX.Element {
  return (
    <CartProvider>
      <MemoryRouter>{children}</MemoryRouter>
    </CartProvider>
  );
}

function renderMobileDetail(): ReturnType<typeof render> {
  return render(<MobileDetail mobile={mockedMobileDetail} />, { wrapper });
}

describe('Given a MobileDetail component', () => {
  describe('When rendered', () => {
    it('Should display the mobile name', () => {
      renderMobileDetail();

      expect(screen.getByRole('heading', { name: mockedMobileDetail.name })).toBeInTheDocument();
    });

    it('Should display the base price before any selection', () => {
      renderMobileDetail();

      expect(screen.getByText(`From ${mockedMobileDetail.basePrice} EUR`)).toBeInTheDocument();
    });

    it('Should render the add to cart button as disabled', () => {
      renderMobileDetail();

      expect(screen.getByRole('button', { name: 'Add to cart' })).toBeDisabled();
    });

    it('Should render the specifications section', () => {
      renderMobileDetail();

      expect(screen.getByRole('heading', { name: 'SPECIFICATIONS' })).toBeInTheDocument();
    });

    it('Should render the similar products section when products exist', () => {
      renderMobileDetail();

      expect(screen.getByRole('heading', { name: 'SIMILAR ITEMS' })).toBeInTheDocument();
    });
  });

  describe('When the user selects a storage option', () => {
    it('Should update the price to match the selected storage', async () => {
      renderMobileDetail();

      const storage = mockedMobileDetail.storageOptions[1];
      await userEvent.click(screen.getByText(storage.capacity));

      expect(screen.getByText(`From ${storage.price} EUR`)).toBeInTheDocument();
    });
  });
});
