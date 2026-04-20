import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { BackLink } from './BackLink';

describe('Given a BackLink component', () => {
  describe('When rendered', () => {
    it('Should render a back button', () => {
      render(
        <MemoryRouter>
          <BackLink />
        </MemoryRouter>,
      );

      expect(screen.getByRole('button', { name: 'BACK' })).toBeInTheDocument();
    });
  });
});
