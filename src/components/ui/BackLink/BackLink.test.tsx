import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { BackLink } from './BackLink';

describe('Given a BackLink component', () => {
  describe('When rendered', () => {
    it('Should render a link pointing to the home page', () => {
      render(
        <MemoryRouter>
          <BackLink />
        </MemoryRouter>,
      );

      const link = screen.getByRole('link', { name: 'BACK' });

      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute('href', '/');
    });
  });
});
