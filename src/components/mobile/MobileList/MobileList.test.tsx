import { render, screen } from '@testing-library/react';
import MobileList from './MobileList';
import { mockedMobiles } from '@/test/mocks/mobiles';

function renderMobileList(mobiles = mockedMobiles): ReturnType<typeof render> {
  return render(<MobileList mobiles={mobiles} />);
}

describe('Given a MobileList component', () => {
  describe('When rendered with a list of mobiles', () => {
    it('Should render a card for each mobile', () => {
      const { container } = renderMobileList();
      const cards = container.querySelectorAll('article');

      expect(cards).toHaveLength(mockedMobiles.length);
    });

    it('Should render each mobile name', () => {
      renderMobileList();

      mockedMobiles.forEach((mobile) => {
        expect(screen.getByText(mobile.name)).toBeInTheDocument();
      });
    });

    it('Should render a list element', () => {
      const { container } = renderMobileList();

      expect(container.querySelector('ul')).toBeInTheDocument();
    });
  });

  describe('When rendered with an empty list', () => {
    it('Should render no cards', () => {
      const { container } = renderMobileList([]);

      expect(container.querySelectorAll('article')).toHaveLength(0);
    });

    it('Should still render the list element', () => {
      const { container } = renderMobileList([]);

      expect(container.querySelector('ul')).toBeInTheDocument();
    });
  });
});
