import React from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import './navbar.css';

const Navbar = ({ cartCount }) => {

  return (
    <nav className="navbar">
      <ul className="navbar-menu">
        <li>
          <Link to="/" className="navbar-link">Home</Link>
        </li>
        <li>
          <Link to="/cart" className="navbar-link">
            <FaShoppingCart className="cart-icon" />
            {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;

