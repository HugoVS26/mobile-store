import type { JSX } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '@/hooks/useCart';
import './Navbar.css';

export function Navbar(): JSX.Element {
  const { itemCount } = useCart();

  return (
    <header className="navbar">
      <nav className="navbar__inner">
        <Link to="/" className="navbar__logo">
          <img
            src="/assets/mbst-logo.svg"
            alt="MBST logo"
            className="navbar__logo-icon"
            width="74"
            height="24"
          />
        </Link>
        <Link to="/cart" className="navbar__cart-wrapper" aria-label={`Cart, ${itemCount} items`}>
          <img
            src={itemCount > 0 ? '/assets/bag-black.svg' : '/assets/bag-white.svg'}
            alt=""
            aria-hidden="true"
            className="navbar__cart-icon"
            width="22"
            height="22"
          />
          {itemCount && <span className="navbar__cart-badge">{itemCount}</span>}
        </Link>
      </nav>
    </header>
  );
}
