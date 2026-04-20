import type { JSX } from 'react';
import { Link } from 'react-router-dom';
import type { Mobile } from '@/api/types';
import './MobileCard.css';

interface MobileCardProps {
  mobile: Mobile;
}

function MobileCard({ mobile }: MobileCardProps): JSX.Element {
  const { id, brand, name, basePrice, imageUrl } = mobile;

  return (
    <Link to={`/product/${id}`} state={{ imageUrl }} className="mobile-card__link">
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
    </Link>
  );
}

export default MobileCard;
