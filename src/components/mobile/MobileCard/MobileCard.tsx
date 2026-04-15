import type { JSX } from 'react';
import type { Mobile } from '@/api/types';
import './MobileCard.css';

interface MobileCardProps {
  mobile: Mobile;
}

function MobileCard({ mobile }: MobileCardProps): JSX.Element {
  const { brand, name, basePrice, imageUrl } = mobile;

  return (
    <article className="mobile-card">
      <div className="mobile-card__image-wrapper">
        <img src={imageUrl} alt={`${brand} ${name}`} className="mobile-card__image" />
      </div>
      <div className="mobile-card__info">
        <div className="mobile-card__identity">
          <p className="mobile-card__brand">{brand}</p>
          <p className="mobile-card__name">{name}</p>
        </div>
        <div className="mobile-card__price-wrapper">
          <p className="mobile-card__price">{basePrice} EUR</p>
        </div>
      </div>
    </article>
  );
}

export default MobileCard;
