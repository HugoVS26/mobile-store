import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { StorageOption } from '@/api/types';
import { StorageSelector } from './StorageSelector';
import { mockedMobileDetail } from '@/test/mocks/mobiles';

const options: StorageOption[] = mockedMobileDetail.storageOptions;

describe('Given a StorageSelector component', () => {
  describe('When rendered with no selection', () => {
    it('Should render a button for each storage option', () => {
      render(<StorageSelector options={options} selected={null} onChange={vi.fn()} />);

      options.forEach((option) => {
        expect(screen.getByText(option.capacity)).toBeInTheDocument();
      });
    });

    it('Should not apply selected style to any option', () => {
      render(<StorageSelector options={options} selected={null} onChange={vi.fn()} />);

      screen.getAllByRole('button').forEach((btn) => {
        expect(btn).not.toHaveClass('storage-selector__option--selected');
      });
    });
  });

  describe('When a storage option is selected', () => {
    it('Should apply selected style to the chosen option', () => {
      const selected = options[1];

      render(<StorageSelector options={options} selected={selected} onChange={vi.fn()} />);

      expect(screen.getByText(selected.capacity)).toHaveClass('storage-selector__option--selected');
    });
  });

  describe('When the user clicks an option', () => {
    it('Should call onChange with the clicked option', async () => {
      const onChange = vi.fn();
      const target = options[2];

      render(<StorageSelector options={options} selected={null} onChange={onChange} />);

      await userEvent.click(screen.getByText(target.capacity));

      expect(onChange).toHaveBeenCalledWith(target);
    });
  });
});
