import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { CartProvider } from '@/context/CartProvider';
import { mockedMobiles } from '@/test/mocks/mobiles';
import * as endpoints from '@/api/endpoints';
import MobileListPage from './MobileListPage';

function renderMobileListPage(): ReturnType<typeof render> {
  return render(
    <CartProvider>
      <MemoryRouter>
        <MobileListPage />
      </MemoryRouter>
    </CartProvider>,
  );
}

describe('Given a MobileListPage', () => {
  describe('When the page is loading', () => {
    it('Should display a loading indicator', () => {
      renderMobileListPage();

      expect(screen.getByText('Loading...')).toBeInTheDocument();
    });
  });

  describe('When the data loads successfully', () => {
    it('Should render a card for each mobile', async () => {
      const { container } = renderMobileListPage();

      await waitFor(() => {
        expect(container.querySelectorAll('article')).toHaveLength(mockedMobiles.length);
      });
    });

    it('Should display the result count', async () => {
      renderMobileListPage();

      await waitFor(() => {
        expect(screen.getByText(`${mockedMobiles.length} RESULTS`)).toBeInTheDocument();
      });
    });

    it('Should render the search bar', async () => {
      renderMobileListPage();

      expect(screen.getByRole('searchbox')).toBeInTheDocument();
    });
  });

  describe('When the API returns an error', () => {
    it('Should display an error message', async () => {
      vi.spyOn(endpoints, 'getMobiles').mockRejectedValueOnce(new Error('Server error'));

      renderMobileListPage();

      await waitFor(() => {
        expect(screen.getByText('Failed to load products. Please try again.')).toBeInTheDocument();
      });
    });
  });

  describe('When the user types in the search bar', () => {
    it('Should filter the results by search query', async () => {
      renderMobileListPage();
      const expectedMobile = 'Galaxy S24 Ultra';
      const unexpectedMobile = 'Pixel 8a';

      await waitFor(() => {
        expect(screen.getByText(mockedMobiles[0].name)).toBeInTheDocument();
      });

      await userEvent.type(screen.getByRole('searchbox'), 'samsung');

      await waitFor(() => {
        expect(screen.getByText(expectedMobile)).toBeInTheDocument();
        expect(screen.queryByText(unexpectedMobile)).not.toBeInTheDocument();
      });
    });

    it('Should update the result count after filtering', async () => {
      renderMobileListPage();

      await waitFor(() => {
        expect(screen.getByText(`${mockedMobiles.length} RESULTS`)).toBeInTheDocument();
      });

      await userEvent.type(screen.getByRole('searchbox'), 'samsung');

      await waitFor(() => {
        expect(screen.getByText('2 RESULTS')).toBeInTheDocument();
      });
    });

    it('Should use singular RESULT when only one mobile matches', async () => {
      renderMobileListPage();

      await waitFor(() => {
        expect(screen.getByText(`${mockedMobiles.length} RESULTS`)).toBeInTheDocument();
      });

      await userEvent.type(screen.getByRole('searchbox'), 'apple');

      await waitFor(() => {
        expect(screen.getByText('1 RESULT')).toBeInTheDocument();
      });
    });
  });

  describe('When the API returns duplicates', () => {
    it('Should deduplicate mobiles by id', async () => {
      const duplicatedMobiles = [mockedMobiles[0], mockedMobiles[0], mockedMobiles[1]];

      vi.spyOn(endpoints, 'getMobiles').mockResolvedValueOnce(duplicatedMobiles);

      const { container } = renderMobileListPage();

      await waitFor(() => {
        expect(container.querySelectorAll('article')).toHaveLength(2);
      });
    });
  });
});
