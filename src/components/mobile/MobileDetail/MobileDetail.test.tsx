import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import type { ReactNode, JSX } from 'react';
import { CartProvider } from '@/context/CartProvider';
import { mockedMobileDetail } from '@/test/mocks/mobiles';
import { MobileDetail } from './MobileDetail';

const mockNavigate = vi.fn();
vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal<Record<string, unknown>>();
  return { ...actual, useNavigate: (): typeof mockNavigate => mockNavigate };
});

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

  describe('When the user adds an item to the cart', () => {
    it('Should navigate to the cart page', async () => {
      renderMobileDetail();

      await userEvent.click(screen.getByText(mockedMobileDetail.storageOptions[0].capacity));
      await userEvent.click(
        screen.getByRole('radio', { name: mockedMobileDetail.colorOptions[0].name }),
      );
      await userEvent.click(screen.getByRole('button', { name: 'Add to cart' }));

      expect(mockNavigate).toHaveBeenCalledWith('/cart');
    });
  });
});
