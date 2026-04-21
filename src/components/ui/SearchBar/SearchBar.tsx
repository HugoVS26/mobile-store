import type { JSX } from 'react';
import './SearchBar.css';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

function SearchBar({ value, onChange }: SearchBarProps): JSX.Element {
  return (
    <div className="search-bar">
      <input
        className="search-bar__input"
        type="search"
        autoCapitalize="sentences"
        placeholder="Search for a smartphone..."
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
      {value && (
        <button
          className="search-bar__clear"
          onClick={() => onChange('')}
          aria-label="Clear search"
        >
          <img src="/assets/close-small.svg" alt="" aria-hidden="true" width="20" height="20" />
        </button>
      )}
    </div>
  );
}

export default SearchBar;
