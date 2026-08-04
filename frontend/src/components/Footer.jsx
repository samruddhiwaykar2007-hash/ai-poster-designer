import React from "react";
import { Link } from "react-router-dom";
import "../styles/Footer.css";

// Footer appears at the bottom of every page.
// It contains the logo, quick navigation links, social icons, and copyright text.
function Footer() {
  // Getting the current year dynamically so we never need to update it manually
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container footer-container">
        {/* Logo + tagline */}
        <div className="footer-brand">
          <h3>
            AI Poster <span className="logo-highlight">Designer</span>
          </h3>
          <p>Create stunning posters in seconds, powered by AI.</p>
        </div>

        {/* Quick links */}
        <div className="footer-links">
          <h4>Quick Links</h4>
          <Link to="/">Home</Link>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/login">Login</Link>
          <Link to="/signup">Signup</Link>
        </div>

        {/* Social icons */}
        <div className="footer-social">
          <h4>Follow Us</h4>
          <div className="social-icons">
            <a href="#" aria-label="Twitter">🐦</a>
            <a href="#" aria-label="Instagram">📷</a>
            <a href="#" aria-label="LinkedIn">💼</a>
            <a href="#" aria-label="GitHub">🐙</a>
          </div>
        </div>
      </div>

      {/* Copyright bar */}
      <div className="footer-bottom">
        <p>© {currentYear} AI Poster Designer. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;