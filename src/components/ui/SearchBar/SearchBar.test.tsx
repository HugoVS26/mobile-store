import { render, screen } from '@testing-library/react';
import { useState } from 'react';
import type { JSX } from 'react';
import userEvent from '@testing-library/user-event';
import SearchBar from './SearchBar';

function renderSearchBar(value = '', onChange = vi.fn()): ReturnType<typeof render> {
  return render(<SearchBar value={value} onChange={onChange} />);
}

function ControlledSearchBar({ onChange }: { onChange?: (v: string) => void }): JSX.Element {
  const [value, setValue] = useState('');
  return (
    <SearchBar
      value={value}
      onChange={(value) => {
        setValue(value);
        onChange?.(value);
      }}
    />
  );
}

describe('Given a SearchBar component', () => {
  describe('When rendered', () => {
    it('Should render the input element', () => {
      renderSearchBar();

      expect(screen.getByRole('searchbox')).toBeInTheDocument();
    });

    it('Should display the provided value', () => {
      const expectedPhone = 'iphone';
      renderSearchBar(expectedPhone);

      expect(screen.getByRole('searchbox')).toHaveValue(expectedPhone);
    });
  });

  describe('When the user types', () => {
    it('Should call onChange with the new value', async () => {
      const onChange = vi.fn();
      const expectedPhone = 'samsung';
      render(<ControlledSearchBar onChange={onChange} />);

      await userEvent.type(screen.getByRole('searchbox'), expectedPhone);

      expect(onChange).toHaveBeenCalled();
      expect(screen.getByRole('searchbox')).toHaveValue(expectedPhone);
    });
  });
});
