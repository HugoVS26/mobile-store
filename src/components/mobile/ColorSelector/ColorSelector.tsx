import { useState, type JSX } from 'react';
import type { ColorOption } from '@/api/types';
import './ColorSelector.css';

interface ColorSelectorProps {
  options: ColorOption[];
  selected: ColorOption | null;
  onChange: (option: ColorOption) => void;
}

export function ColorSelector({ options, selected, onChange }: ColorSelectorProps): JSX.Element {
  const [hoveredOption, setHoveredOption] = useState<ColorOption | null>(null);

  return (
    <div className="color-selector">
      <span className="color-selector__label">COLOR. PICK YOUR FAVOURITE.</span>
      <div role="radiogroup" aria-label="Color" className="color-selector__swatches">
        {options.map((option) => (
          <button
            key={option.name}
            role="radio"
            aria-checked={selected?.name === option.name}
            aria-label={option.name}
            className={`color-selector__swatch${selected?.name === option.name ? ' color-selector__swatch--selected' : ''}`}
            style={{ backgroundColor: option.hexCode }}
            onClick={() => onChange(option)}
            onMouseEnter={() => setHoveredOption(option)}
            onMouseLeave={() => setHoveredOption(null)}
          />
        ))}
      </div>
      <span className="color-selector__selected-name">
        {(hoveredOption ?? selected)?.name ?? ''}
      </span>
    </div>
  );
}
