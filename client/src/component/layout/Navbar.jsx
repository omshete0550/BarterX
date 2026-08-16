import {
  Search,
  Heart,
  Bell,
  User,
  ChevronDown,
  Menu,
  X,
  Plus,
} from "lucide-react";

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Button from "../common/Button";

import "../../styles/layout/navbar.css";

function Navbar() {
  const [mobileMenu, setMobileMenu] = useState(false);

  const navigate = useNavigate();

  return (
    <header className="navbar">
      <div className="navbar-container">
        {/* Logo */}

        <Link to="/" className="navbar-logo">
          <span className="logo-mark">B</span>
          <span className="logo-text">
            BARTER<span>X</span>
          </span>
        </Link>

        {/* Desktop Navigation */}

        <nav className="navbar-links">
          <Link to="/" className="active">
            Home
          </Link>

          <Link to="/products">
            Categories
            <ChevronDown size={15} />
          </Link>

          <Link to="/about">How It Works</Link>

          <Link to="/about">About</Link>

          <Link to="/contact">Contact</Link>
        </nav>

        {/* Search */}

        <div className="navbar-search">
          <Search size={18} />

          <input
            type="text"
            placeholder="Search products, categories..."
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                navigate(`/search?q=${e.target.value}`);
              }
            }}
          />
        </div>

        {/* Actions */}

        <div className="navbar-actions">
          <button
            className="navbar-icon"
            onClick={() => navigate("/wishlist")}
            aria-label="Wishlist"
          >
            <Heart size={21} />
          </button>

          <button
            className="navbar-icon notification-button"
            onClick={() => navigate("/notifications")}
            aria-label="Notifications"
          >
            <Bell size={21} />
            <span className="notification-badge">3</span>
          </button>

          <button
            className="navbar-profile"
            onClick={() => navigate("/profile")}
          >
            <div className="avatar">
              <User size={20} />
            </div>

            <ChevronDown size={15} />
          </button>

          <Button
            size="small"
            icon={<Plus size={16} />}
            onClick={() => navigate("/products/add")}
          >
            Add Product
          </Button>
        </div>

        {/* Mobile button */}

        <button
          className="mobile-menu-button"
          onClick={() => setMobileMenu(!mobileMenu)}
        >
          {mobileMenu ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Navigation */}

      {mobileMenu && (
        <div className="mobile-menu">
          <Link to="/" onClick={() => setMobileMenu(false)}>
            Home
          </Link>

          <Link to="/products" onClick={() => setMobileMenu(false)}>
            Products
          </Link>

          <Link to="/about" onClick={() => setMobileMenu(false)}>
            About
          </Link>

          <Link to="/contact" onClick={() => setMobileMenu(false)}>
            Contact
          </Link>

          <Button fullWidth onClick={() => navigate("/products/add")}>
            Add Product
          </Button>
        </div>
      )}
    </header>
  );
}

export default Navbar;
