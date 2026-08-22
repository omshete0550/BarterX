import {
  Search,
  Heart,
  Bell,
  User,
  ChevronDown,
  Menu,
  X,
  Plus,
  Package,
  Settings,
  LogOut,
} from "lucide-react";

import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Button from "../common/Button";

import "../../styles/layout/navbar.css";

function Navbar() {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [profileMenu, setProfileMenu] = useState(false);

  const navigate = useNavigate();
  const profileRef = useRef(null);

  // Close profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleNavigation = (path) => {
    setProfileMenu(false);
    setMobileMenu(false);
    navigate(path);
  };

  const handleLogout = () => {
    setProfileMenu(false);

    // Add your authentication logout logic here
    // Example:
    // localStorage.removeItem("token");

    navigate("/login");
  };

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
          <Link to="/home" className="active">
            Home
          </Link>

          <Link to="/products">
            Categories
            <ChevronDown size={15} />
          </Link>

          <Link to="/about">How It Works</Link>
        </nav>

        {/* Search */}

        <div className="navbar-search">
          <Search size={18} />

          <input
            type="text"
            placeholder="Search products, categories..."
            onKeyDown={(e) => {
              if (e.key === "Enter" && e.target.value.trim()) {
                navigate(
                  `/search?q=${encodeURIComponent(e.target.value.trim())}`,
                );
              }
            }}
          />
        </div>

        {/* Actions */}

        <div className="navbar-actions">
          {/* Wishlist */}

          <button
            className="navbar-icon"
            onClick={() => navigate("/wishlist")}
            aria-label="Wishlist"
          >
            <Heart size={21} />
          </button>

          {/* Notifications */}

          <button
            className="navbar-icon notification-button"
            onClick={() => navigate("/notifications")}
            aria-label="Notifications"
          >
            <Bell size={21} />
            <span className="notification-badge">3</span>
          </button>

          {/* Profile */}

          <div className="profile-wrapper" ref={profileRef}>
            <button
              className={`navbar-profile ${profileMenu ? "profile-open" : ""}`}
              onClick={() => setProfileMenu(!profileMenu)}
              aria-label="Open profile menu"
              aria-expanded={profileMenu}
            >
              <div className="avatar">
                <User size={20} />
              </div>

              <ChevronDown
                size={15}
                className={`profile-chevron ${profileMenu ? "rotate" : ""}`}
              />
            </button>

            {/* Profile Dropdown */}

            {profileMenu && (
              <div className="profile-dropdown">
                {/* User Header */}

                <div className="profile-dropdown-header">
                  <div className="dropdown-avatar">
                    <User size={21} />
                  </div>

                  <div className="profile-user-info">
                    <strong>My Account</strong>
                    <span>Welcome back!</span>
                  </div>
                </div>

                <div className="dropdown-divider" />

                {/* Menu Items */}

                <button
                  className="profile-dropdown-item"
                  onClick={() => handleNavigation("/profile")}
                >
                  <User size={18} />
                  <span>View Profile</span>
                </button>

                <button
                  className="profile-dropdown-item"
                  onClick={() => handleNavigation("/my-products")}
                >
                  <Package size={18} />
                  <span>My Products</span>
                </button>

                <button
                  className="profile-dropdown-item"
                  onClick={() => handleNavigation("/wishlist")}
                >
                  <Heart size={18} />
                  <span>Wishlist</span>
                </button>

                <button
                  className="profile-dropdown-item"
                  onClick={() => handleNavigation("/notifications")}
                >
                  <Bell size={18} />
                  <span>Notifications</span>

                  <span className="dropdown-notification-count">3</span>
                </button>

                <button
                  className="profile-dropdown-item"
                  onClick={() => handleNavigation("/settings")}
                >
                  <Settings size={18} />
                  <span>Settings</span>
                </button>

                <div className="dropdown-divider" />

                {/* Logout */}

                <button
                  className="profile-dropdown-item logout-item"
                  onClick={handleLogout}
                >
                  <LogOut size={18} />
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>

          {/* Add Product */}

          <Button
            size="small"
            icon={<Plus size={16} />}
            onClick={() => navigate("/add-product")}
          >
            Add Product
          </Button>
        </div>

        {/* Mobile Menu Button */}

        <button
          className="mobile-menu-button"
          onClick={() => setMobileMenu(!mobileMenu)}
          aria-label="Toggle navigation menu"
        >
          {mobileMenu ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Navigation */}

      {mobileMenu && (
        <div className="mobile-menu">
          <Link to="/home" onClick={() => setMobileMenu(false)}>
            Home
          </Link>

          <Link to="/products" onClick={() => setMobileMenu(false)}>
            Categories
          </Link>

          <Link to="/about" onClick={() => setMobileMenu(false)}>
            How It Works
          </Link>

          <Link to="/wishlist" onClick={() => setMobileMenu(false)}>
            Wishlist
          </Link>

          <Link to="/notifications" onClick={() => setMobileMenu(false)}>
            Notifications
          </Link>

          <Link to="/profile" onClick={() => setMobileMenu(false)}>
            View Profile
          </Link>

          <Link to="/my-products" onClick={() => setMobileMenu(false)}>
            My Products
          </Link>

          <Link to="/settings" onClick={() => setMobileMenu(false)}>
            Settings
          </Link>

          <Button fullWidth onClick={() => handleNavigation("/add-product")}>
            <Plus size={16} />
            Add Product
          </Button>

          <button className="mobile-logout" onClick={handleLogout}>
            <LogOut size={17} />
            Logout
          </button>
        </div>
      )}
    </header>
  );
}

export default Navbar;
