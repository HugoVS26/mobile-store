import type { JSX } from 'react';
import type { CartItem as CartItemType } from '@/context/CartContext';
import { getCartKey } from '@/context/cartUtils';
import './CartItem.css';

interface CartItemProps {
  item: CartItemType;
  onRemove: (key: string) => void;
}

export function CartItem({ item, onRemove }: CartItemProps): JSX.Element {
  return (
    <article className="cart-item">
      <img src={item.imageUrl} alt={`${item.brand} ${item.name}`} className="cart-item__image" />
      <div className="cart-item__details">
        <div className="cart-item__info">
          <div className="cart-item__info-header">
            <span className="cart-item__brand">
              {item.brand} {item.name}
            </span>
            <span className="cart-item__specs">
              {item.storage} | {item.color}
            </span>
          </div>
          <span className="cart-item__price">{item.price} EUR</span>
        </div>
        <button
          className="cart-item__remove"
          aria-label={`Remove ${item.name} from cart`}
          onClick={() => onRemove(getCartKey(item))}
        >
          Eliminar
        </button>
      </div>
    </article>
  );
}
