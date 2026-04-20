import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { ColorOption } from '@/api/types';
import { ColorSelector } from './ColorSelector';
import { mockedMobileDetail } from '@/test/mocks/mobiles';

const options: ColorOption[] = mockedMobileDetail.colorOptions;

describe('Given a ColorSelector component', () => {
  describe('When rendered with no selection', () => {
    it('Should render a swatch for each color option', () => {
      render(<ColorSelector options={options} selected={null} onChange={vi.fn()} />);

      const swatches = screen.getAllByRole('radio');

      expect(swatches).toHaveLength(options.length);
    });

    it('Should mark all swatches as unchecked', () => {
      render(<ColorSelector options={options} selected={null} onChange={vi.fn()} />);

      screen.getAllByRole('radio').forEach((swatch) => {
        expect(swatch).toHaveAttribute('aria-checked', 'false');
      });
    });
  });

  describe('When a color is selected', () => {
    it('Should mark the selected swatch as checked', () => {
      const selected = options[1];

      render(<ColorSelector options={options} selected={selected} onChange={vi.fn()} />);

      expect(screen.getByRole('radio', { name: selected.name })).toHaveAttribute(
        'aria-checked',
        'true',
      );
    });

    it('Should display the selected color name', () => {
      const selected = options[0];

      render(<ColorSelector options={options} selected={selected} onChange={vi.fn()} />);

      expect(screen.getByText(selected.name)).toBeInTheDocument();
    });
  });

  describe('When the user clicks a swatch', () => {
    it('Should call onChange with the clicked option', async () => {
      const onChange = vi.fn();
      const target = options[2];

      render(<ColorSelector options={options} selected={null} onChange={onChange} />);

      await userEvent.click(screen.getByRole('radio', { name: target.name }));

      expect(onChange).toHaveBeenCalledWith(target);
    });
  });
});
