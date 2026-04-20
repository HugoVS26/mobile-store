import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { mockedMobileDetail } from '@/test/mocks/mobiles';
import MobileDetailPage from './MobileDetailPage';

function renderDetailPage(id: string = mockedMobileDetail.id): ReturnType<typeof render> {
  return render(
    <MemoryRouter initialEntries={[`/product/${id}`]}>
      <Routes>
        <Route path="/product/:id" element={<MobileDetailPage />} />
      </Routes>
    </MemoryRouter>,
  );
}

describe('Given a MobileDetailPage', () => {
  describe('When the page is loading', () => {
    it('Should display a loading indicator', () => {
      renderDetailPage();

      expect(screen.getByText('Loading...')).toBeInTheDocument();
    });
  });

  describe('When the data loads successfully', () => {
    it('Should display the mobile name', async () => {
      renderDetailPage();

      await waitFor(() => {
        expect(screen.getByRole('heading', { name: mockedMobileDetail.name })).toBeInTheDocument();
      });
    });

    it('Should display the base price before any selection', async () => {
      renderDetailPage();

      await waitFor(() => {
        expect(screen.getByText(`From ${mockedMobileDetail.basePrice} EUR`)).toBeInTheDocument();
      });
    });

    it('Should render a swatch for each color option', async () => {
      renderDetailPage();

      await waitFor(() => {
        mockedMobileDetail.colorOptions.forEach((option) => {
          expect(screen.getByRole('radio', { name: option.name })).toBeInTheDocument();
        });
      });
    });

    it('Should render a button for each storage option', async () => {
      renderDetailPage();

      await waitFor(() => {
        mockedMobileDetail.storageOptions.forEach((option) => {
          expect(screen.getByText(option.capacity)).toBeInTheDocument();
        });
      });
    });

    it('Should render the add to cart button as disabled', async () => {
      renderDetailPage();

      await waitFor(() => {
        expect(screen.getByRole('button', { name: /add to cart/i })).toBeDisabled();
      });
    });
  });

  describe('When the user selects color and storage', () => {
    it('Should update the price to match the selected storage', async () => {
      renderDetailPage();

      const targetStorage = mockedMobileDetail.storageOptions[1];

      await waitFor(() => {
        expect(screen.getByText(targetStorage.capacity)).toBeInTheDocument();
      });

      await userEvent.click(screen.getByText(targetStorage.capacity));

      expect(screen.getByText(`From ${targetStorage.price} EUR`)).toBeInTheDocument();
    });
  });

  describe('When the API returns an error', () => {
    it('Should display an error message', async () => {
      renderDetailPage('INVALID-ID');

      await waitFor(() => {
        expect(screen.getByText(/not found/i)).toBeInTheDocument();
      });
    });
  });
});
