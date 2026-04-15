import type { JSX } from 'react';
import type { Mobile } from '@/api/types';
import MobileCard from '@/components/mobile/MobileCard/MobileCard';
import './MobileList.css';

interface MobileListProps {
  mobiles: Mobile[];
}

function MobileList({ mobiles }: MobileListProps): JSX.Element {
  return (
    <section className="mobile-list">
      <ul className="mobile-list__grid">
        {mobiles.map((mobile) => (
          <li key={mobile.id}>
            <MobileCard mobile={mobile} />
          </li>
        ))}
      </ul>
    </section>
  );
}

export default MobileList;
