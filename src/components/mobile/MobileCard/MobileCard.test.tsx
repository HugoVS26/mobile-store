import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import MobileCard from './MobileCard';
import { mockedMobiles } from '@/test/mocks/mobiles';

const mobile = mockedMobiles[0];

function renderMobileCard(): ReturnType<typeof render> {
  return render(
    <MemoryRouter>
      <MobileCard mobile={mobile} />
    </MemoryRouter>,
  );
}

describe('Given a MobileCard component', () => {
  describe('When rendered with a mobile prop', () => {
    it('Should render the image with accessible alt text and correct src', () => {
      renderMobileCard();

      const img = screen.getByRole('img', { name: `${mobile.brand} ${mobile.name}` });

      expect(img).toBeInTheDocument();
      expect(img).toHaveAttribute('src', mobile.imageUrl);
    });

    it('Should render the brand name', () => {
      renderMobileCard();

      expect(screen.getByText(mobile.brand)).toBeInTheDocument();
    });

    it('Should render the mobile name', () => {
      renderMobileCard();

      expect(screen.getByText(mobile.name)).toBeInTheDocument();
    });

    it('Should render the price in EUR', () => {
      renderMobileCard();

      expect(screen.getByText(`${mobile.basePrice} EUR`)).toBeInTheDocument();
    });

    it('Should be wrapped in an article element', () => {
      const { container } = renderMobileCard();

      expect(container.querySelector('article')).toBeInTheDocument();
    });
  });
});
