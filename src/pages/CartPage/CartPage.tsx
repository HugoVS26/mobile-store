import type { JSX } from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '@/components/layout/Navbar/Navbar';
import { CartItem } from '@/components/cart/CartItem/CartItem';
import { useCart } from '@/hooks/useCart';
import './CartPage.css';

function CartPage(): JSX.Element {
  const { items, removeItem, total } = useCart();

  return (
    <>
      <Navbar />
      <main className="cart-page">
        <h1 className="cart-page__title">CART ({items.length})</h1>
        {items.length > 0 && (
          <ul className="cart-page__list">
            {items.map((item) => (
              <li key={`${item.id}-${item.color}-${item.storage}`}>
                <CartItem item={item} onRemove={removeItem} />
              </li>
            ))}
          </ul>
        )}
        <div className="cart-page__footer">
          <Link to="/" className="cart-page__btn cart-page__btn--continue">
            CONTINUE SHOPPING
          </Link>
          {items.length > 0 && (
            <div className="cart-page__actions">
              <p className="cart-page__total">
                TOTAL <span className="cart-page__total-price">{total} EUR</span>
              </p>
              <button className="cart-page__btn cart-page__btn--pay">PAY</button>
            </div>
          )}
        </div>
      </main>
    </>
  );
}

export default CartPage;
