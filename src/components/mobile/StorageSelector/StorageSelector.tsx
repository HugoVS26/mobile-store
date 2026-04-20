import type { JSX } from 'react';
import type { StorageOption } from '@/api/types';
import './StorageSelector.css';

interface StorageSelectorProps {
  options: StorageOption[];
  selected: StorageOption | null;
  onChange: (option: StorageOption) => void;
}

export function StorageSelector({
  options,
  selected,
  onChange,
}: StorageSelectorProps): JSX.Element {
  return (
    <div className="storage-selector">
      <p className="storage-selector__label">STORAGE ¿HOW MUCH SPACE DO YOU NEED?</p>
      <div className="storage-selector__options">
        {options.map((option) => (
          <button
            key={option.capacity}
            className={`storage-selector__option${selected?.capacity === option.capacity ? ' storage-selector__option--selected' : ''}`}
            onClick={() => onChange(option)}
          >
            {option.capacity}
          </button>
        ))}
      </div>
    </div>
  );
}
