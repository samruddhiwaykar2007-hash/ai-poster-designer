import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "../styles/Navbar.css";

// Navbar shows the logo and navigation links.
// On mobile screens, the links collapse into a hamburger menu.
function Navbar() {
  // isMenuOpen controls whether the mobile menu is visible
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="navbar glass">
      <div className="navbar-container">
        {/* Logo */}
        <Link to="/" className="navbar-logo" onClick={closeMenu}>
          <span className="logo-icon">✨</span>
          <span>
            AI Poster <span className="logo-highlight">Designer</span>
          </span>
        </Link>

        {/* Desktop + Mobile Nav Links */}
        <nav className={`navbar-links ${isMenuOpen ? "open" : ""}`}>
          <NavLink to="/" end onClick={closeMenu} className="nav-link">
            Home
          </NavLink>
          <NavLink to="/dashboard" onClick={closeMenu} className="nav-link">
            Dashboard
          </NavLink>
          <NavLink to="/login" onClick={closeMenu} className="nav-link">
            Login
          </NavLink>
          <Link to="/signup" onClick={closeMenu} className="btn-primary navbar-cta">
            Signup
          </Link>
        </nav>

        {/* Hamburger button - only visible on small screens */}
        <button
          className={`hamburger ${isMenuOpen ? "active" : ""}`}
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </header>
  );
}

export default Navbar;
