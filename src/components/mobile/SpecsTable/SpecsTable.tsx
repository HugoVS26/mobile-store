import type { JSX } from 'react';
import type { MobileSpecs } from '@/api/types';
import './SpecsTable.css';

type FullSpecs = MobileSpecs & { brand: string; name: string; description: string };

interface SpecsTableProps {
  specs: FullSpecs;
}

const SPEC_LABELS: [keyof FullSpecs, string][] = [
  ['brand', 'Brand'],
  ['name', 'Name'],
  ['description', 'Description'],
  ['screen', 'Screen'],
  ['resolution', 'Resolution'],
  ['processor', 'Processor'],
  ['mainCamera', 'Main Camera'],
  ['selfieCamera', 'Selfie Camera'],
  ['battery', 'Battery'],
  ['os', 'OS'],
  ['screenRefreshRate', 'Refresh Rate'],
];

export function SpecsTable({ specs }: SpecsTableProps): JSX.Element {
  return (
    <table className="specs-table">
      <tbody>
        {SPEC_LABELS.map(([key, label]) => (
          <tr key={key} className="specs-table__row">
            <th className="specs-table__key">{label}</th>
            <td className="specs-table__value">{specs[key]}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
