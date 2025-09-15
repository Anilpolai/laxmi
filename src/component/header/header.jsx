import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom'; // ✅ added useNavigate
import './header.css';
import Topre from '../toper/toper';
import logo from '../../img/logo-1.png';
import { IoSearch, IoCartOutline } from "react-icons/io5";
import { FaRegHeart, FaRegUser, FaHome} from "react-icons/fa";
import { BiShoppingBag } from "react-icons/bi";
import { PiShoppingBagLight } from "react-icons/pi";
import SignInSignUp from '../../login/login';
import { useSelector } from 'react-redux';

const Header = () => {   // ✅ capitalized
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(!menuOpen);

  const [showAuth, setShowAuth] = useState(false);
  const toggleAuth = () => setShowAuth(!showAuth);

  const wishlistCount = useSelector((state) => state.wishlist.items.length);
  const navigate = useNavigate();

  return (
    <div>
      <Topre />

      {/* Top Header */}
      <div className="top-header d-flex justify-content-between align-items-center py-2 px-2">
        <div className="d-flex align-items-center gap-3">
          {/* Hamburger for mobile */}
          <span className="d-lg-none menu-toggle" onClick={toggleMenu}>
            &#9776;
          </span>
          {/* Search Icon */}
          <BiShoppingBag  className="icon" />
        </div>

        {/* Logo */}
        <div className="logo text-center">
          <NavLink to="/">
            <img src={logo} alt="logo" height="60" />
          </NavLink>
        </div>

        {/* Icons */}
        <div className="icons d-flex gap-3 align-items-center">
          <div className="position-relative" onClick={() => navigate("/wishlist")}>
            <FaRegHeart className="icon" />
            {wishlistCount > 0 && <span className="badge">{wishlistCount}</span>}
          </div>

          <FaRegUser className="icon d-none d-lg-inline" onClick={toggleAuth} />

          <div className="position-relative d-none d-lg-inline">
            <IoCartOutline className="icon" />
            <span className="badge">0</span>
          </div>
        </div>
      </div>

      {/* Desktop Navigation */}
      <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom d-none d-lg-block">
        <div className="container justify-content-center py-2">
          <ul className="navbar-nav text-uppercase gap-4">
            <li className="nav-item"><NavLink to="/" className="nav-link" end>Home</NavLink></li>
            <li className="nav-item"><NavLink to="/Kurti" className="nav-link">Kurti</NavLink></li>
            <li className="nav-item"><NavLink to="/kurti-set" className="nav-link">Kurti Set</NavLink></li>
            <li className="nav-item"><NavLink to="/tunics" className="nav-link">Tunics</NavLink></li>
            <li className="nav-item"><NavLink to="/co-ord" className="nav-link">Co-Ord Set</NavLink></li>
            <li className="nav-item"><NavLink to="/contact" className="nav-link">Contact</NavLink></li>
            <li className="nav-item"><NavLink to="/about" className="nav-link">About Us</NavLink></li>
          </ul>
        </div>
      </nav>

      {/* Mobile Navigation Menu */}
      <div className={`mobile-nav ${menuOpen ? 'open' : ''} d-lg-none`}>
        <div className="close-icon text-end p-3">
          <span onClick={toggleMenu}>&times;</span>
        </div>
        <ul className="navbar-nav text-uppercase px-3">
          <li className="nav-item"><NavLink to="/" className="nav-link" onClick={toggleMenu}>Home</NavLink></li>
          <li className="nav-item"><NavLink to="/Kurti" className="nav-link" onClick={toggleMenu}>Kurti</NavLink></li>
          <li className="nav-item"><NavLink to="/kurti-set" className="nav-link" onClick={toggleMenu}>Kurti Set</NavLink></li>
          <li className="nav-item"><NavLink to="/tunics" className="nav-link" onClick={toggleMenu}>Tunics</NavLink></li>
          <li className="nav-item"><NavLink to="/co-ord-set" className="nav-link" onClick={toggleMenu}>Co-Ord Set</NavLink></li>
          <li className="nav-item"><NavLink to="/contact" className="nav-link" onClick={toggleMenu}>Contact</NavLink></li>
          <li className="nav-item"><NavLink to="/about" className="nav-link" onClick={toggleMenu}>About Us</NavLink></li>
        </ul>
      </div>

      {/* Mobile Footer Icons */}
      <div className="mobile-footer-icons d-flex justify-content-around align-items-center d-lg-none">
        <NavLink to="/" className="footer-icon">
          <FaHome className="icon" />
          <span>Home</span>
        </NavLink>
        <NavLink to="/shop" className="footer-icon">
          <PiShoppingBagLight className="icon" />
          <span>Shop</span>
        </NavLink>
        <NavLink to="/profile" className="footer-icon">
          <FaRegUser className="icon" />
          <span>Profile</span>
        </NavLink>
        <NavLink to="/cart" className="footer-icon position-relative">
          <IoCartOutline className="icon" />
          <span>Cart</span>
          <span className="badge">0</span>
        </NavLink>
      </div>

      {/* SignInSignUp Popup */}
      {showAuth && (
        <div className="auth-popup">
          <div className="auth-content">
            <span className="close-btn" onClick={toggleAuth}>&times;</span>
            <SignInSignUp />
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;   // ✅ capitalized
