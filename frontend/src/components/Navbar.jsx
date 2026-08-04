import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import "../styles/Navbar.css";

// Navbar shows the logo and navigation links.
// On mobile screens, the links collapse into a hamburger menu.
// It's transparent at the top of the page, and switches to a
// glassmorphism style once the user scrolls down.
function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className={`navbar ${isScrolled ? "scrolled" : ""}`}>
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
          <NavLink
            to="/"
            end
            onClick={closeMenu}
            className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
          >
            Home
          </NavLink>
          <NavLink
            to="/dashboard"
            onClick={closeMenu}
            className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/login"
            onClick={closeMenu}
            className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
          >
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