import type { JSX } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

export function Navbar(): JSX.Element {
  return (
    <header className="navbar">
      <nav className="navbar__inner">
        <Link to="/" className="navbar__logo">
          <img
            src="/assets/mbst-logo.svg"
            alt=""
            aria-hidden="true"
            className="navbar__logo-icon"
          />
        </Link>
        <div className="navbar__cart-wrapper">
          <img
            src="/assets/bag-white.svg"
            alt=""
            aria-hidden="true"
            className="navbar__cart-icon"
          />
        </div>
      </nav>
    </header>
  );
}
