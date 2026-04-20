import { render, screen } from '@testing-library/react';
import { SpecsTable } from './SpecsTable';
import { mockedMobileDetail } from '@/test/mocks/mobiles';

const specs = {
  brand: mockedMobileDetail.brand,
  name: mockedMobileDetail.name,
  description: mockedMobileDetail.description,
  ...mockedMobileDetail.specs,
};

describe('Given a SpecsTable component', () => {
  describe('When rendered with specs', () => {
    it('Should render a row for every spec label', () => {
      render(<SpecsTable specs={specs} />);

      const labels = [
        'Brand',
        'Name',
        'Description',
        'Screen',
        'Resolution',
        'Processor',
        'Main Camera',
        'Selfie Camera',
        'Battery',
        'OS',
        'Refresh Rate',
      ];

      labels.forEach((label) => {
        expect(screen.getByText(label)).toBeInTheDocument();
      });
    });

    it('Should render the spec values', () => {
      render(<SpecsTable specs={specs} />);

      expect(screen.getByText(specs.brand)).toBeInTheDocument();
      expect(screen.getByText(specs.screen)).toBeInTheDocument();
      expect(screen.getByText(specs.os)).toBeInTheDocument();
    });

    it('Should render as a table', () => {
      const { container } = render(<SpecsTable specs={specs} />);

      expect(container.querySelector('table')).toBeInTheDocument();
    });
  });
});
