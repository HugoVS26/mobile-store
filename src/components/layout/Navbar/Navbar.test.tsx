import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Navbar } from './Navbar';

function renderNavbar(): ReturnType<typeof render> {
  return render(
    <MemoryRouter>
      <Navbar />
    </MemoryRouter>,
  );
}

describe('Given a Navbar component', () => {
  describe('When is rendered', () => {
    it('Should render the logo with link pointing to /', () => {
      const { container } = renderNavbar();

      expect(container.querySelector('.navbar__logo')).toHaveAttribute('href', '/');
    });

    it('Should show the white bag icon', () => {
      const { container } = renderNavbar();

      expect(container.querySelector('.navbar__cart-icon')).toHaveAttribute(
        'src',
        '/assets/bag-white.svg',
      );
    });
  });
});
