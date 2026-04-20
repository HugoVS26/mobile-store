import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { SimilarProducts } from './SimilarProducts';
import { mockedMobiles } from '@/test/mocks/mobiles';

function renderSimilarProducts(products = mockedMobiles.slice(0, 2)): ReturnType<typeof render> {
  return render(
    <MemoryRouter>
      <SimilarProducts products={products} />
    </MemoryRouter>,
  );
}

describe('Given a SimilarProducts component', () => {
  describe('When rendered with a list of products', () => {
    it('Should render the section title', () => {
      renderSimilarProducts();

      expect(screen.getByRole('heading', { name: 'SIMILAR ITEMS' })).toBeInTheDocument();
    });

    it('Should render a card for each product', () => {
      const products = mockedMobiles.slice(0, 2);
      renderSimilarProducts(products);

      products.forEach((product) => {
        expect(screen.getByText(product.name)).toBeInTheDocument();
      });
    });
  });

  describe('When the list contains duplicate product ids', () => {
    it('Should render each product only once', () => {
      const withDuplicate = [mockedMobiles[0], mockedMobiles[0], mockedMobiles[1]];
      renderSimilarProducts(withDuplicate);

      expect(screen.getAllByText(mockedMobiles[0].name)).toHaveLength(1);
    });
  });
});
