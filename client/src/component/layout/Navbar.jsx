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
  LogOut,
  MessageCircle,
  Repeat2,
  Bookmark,
} from "lucide-react";

import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Button from "../common/Button";
import { logout } from "../../features/auth/authSlice";
import { fetchWishlist } from "../../features/wishlist/wishlistSlice";
import { fetchNotifications } from "../../features/notifications/notificationSlice";

import "../../styles/layout/navbar.css";

function Navbar() {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [profileMenu, setProfileMenu] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { user, token } = useSelector((state) => state.auth);
  const unreadNotifications = useSelector((state) => state.notifications.unreadCount);
  const isLoggedIn = Boolean(user && token);
  const profileRef = useRef(null);
  const pathname = location.pathname;

  const marketplaceIsActive =
    pathname === "/products" ||
    pathname.startsWith("/products/") ||
    pathname.startsWith("/category/") ||
    pathname === "/search";

  const swapsAreActive =
    pathname === "/swap-requests" ||
    pathname.startsWith("/swap-request/") ||
    pathname.startsWith("/swap/");

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

  useEffect(() => {
    if (!isLoggedIn) return;
    dispatch(fetchWishlist());
    dispatch(fetchNotifications());
  }, [dispatch, isLoggedIn]);

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setMobileMenu(false);
        setProfileMenu(false);
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  const handleNavigation = (path) => {
    setProfileMenu(false);
    setMobileMenu(false);
    navigate(path);
  };

  const handleLogout = () => {
    setProfileMenu(false);
    setMobileMenu(false);
    dispatch(logout());
    navigate("/");
  };

  const handleSearch = (event) => {
    event.preventDefault();
    const query = new FormData(event.currentTarget).get("query")?.trim();

    if (query) {
      navigate(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  const mobileLinkClass = ({ isActive }) =>
    isActive ? "mobile-menu-link active" : "mobile-menu-link";

  return (
    <header className="navbar">
      <div className="navbar-container">
        {/* Logo */}

        <Link
          to={isLoggedIn ? "/home" : "/"}
          className="navbar-logo"
          aria-label="BarterX home"
        >
          <span className="logo-mark">B</span>

          <span className="logo-text">
            BARTER<span>X</span>
          </span>
        </Link>

        {/* Desktop Navigation */}

        <nav className="navbar-links" aria-label="Primary navigation">
          <NavLink
            to="/home"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Home
          </NavLink>

          <NavLink
            to="/products"
            className={() => (marketplaceIsActive ? "active" : "")}
          >
            Browse Products
          </NavLink>

          {isLoggedIn && (
            <>
              <NavLink
                to="/swap-requests"
                className={() => (swapsAreActive ? "active" : "")}
              >
                My Swaps
              </NavLink>
              <NavLink
                to="/messages"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                Messages
              </NavLink>
            </>
          )}
        </nav>

        {/* Search */}

        <form className="navbar-search" onSubmit={handleSearch} role="search">
          <Search size={18} />

          <input
            type="text"
            name="query"
            placeholder="Search products, categories..."
            aria-label="Search products and categories"
          />
        </form>

        {/* Actions */}

        <div className="navbar-actions">
          {isLoggedIn ? (
            <>
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
                {unreadNotifications > 0 && (
                  <span className="notification-badge">
                    {unreadNotifications > 99 ? "99+" : unreadNotifications}
                  </span>
                )}
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
                        <strong>{user.name || "My account"}</strong>
                        <span>{user.email || ""}</span>
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
                      onClick={() => handleNavigation("/swap-requests")}
                    >
                      <Repeat2 size={18} />
                      <span>My Swaps</span>
                    </button>

                    <button
                      className="profile-dropdown-item"
                      onClick={() => handleNavigation("/messages")}
                    >
                      <MessageCircle size={18} />
                      <span>Messages</span>
                    </button>

                    <button
                      className="profile-dropdown-item"
                      onClick={() => handleNavigation("/saved-items")}
                    >
                      <Bookmark size={18} />
                      <span>Saved Items</span>
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
            </>
          ) : (
            <div className="navbar-auth-links">
              <Link to="/login" className="navbar-login-link">
                Login
              </Link>
              <Link to="/register" className="navbar-register-link">
                Register
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}

        <button
          className="mobile-menu-button"
          onClick={() => setMobileMenu(!mobileMenu)}
          aria-label="Toggle navigation menu"
          aria-expanded={mobileMenu}
          aria-controls="mobile-navigation"
        >
          {mobileMenu ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Navigation */}

      {mobileMenu && (
        <nav
          className="mobile-menu"
          id="mobile-navigation"
          aria-label="Mobile navigation"
          onClick={(event) => {
            if (event.target.closest("a")) setMobileMenu(false);
          }}
        >
          <NavLink to="/home" className={mobileLinkClass}>
            Home
          </NavLink>

          <NavLink
            to="/products"
            className={() =>
              marketplaceIsActive ? "mobile-menu-link active" : "mobile-menu-link"
            }
          >
            Browse Products
          </NavLink>

          {isLoggedIn ? (
            <>
              <NavLink
                to="/swap-requests"
                className={() =>
                  swapsAreActive ? "mobile-menu-link active" : "mobile-menu-link"
                }
              >
                <Repeat2 size={17} />
                My Swaps
              </NavLink>
              <NavLink to="/messages" className={mobileLinkClass}>
                <MessageCircle size={17} />
                Messages
              </NavLink>
              <NavLink to="/wishlist" className={mobileLinkClass}>
                <Heart size={17} />
                Wishlist
              </NavLink>
              <NavLink to="/notifications" className={mobileLinkClass}>
                <Bell size={17} />
                Notifications
              </NavLink>
              <NavLink to="/profile" className={mobileLinkClass}>
                <User size={17} />
                My Profile
              </NavLink>
              <NavLink to="/my-products" className={mobileLinkClass}>
                <Package size={17} />
                My Products
              </NavLink>
              <NavLink to="/saved-items" className={mobileLinkClass}>
                <Bookmark size={17} />
                Saved Items
              </NavLink>
              <Button
                fullWidth
                onClick={() => handleNavigation("/add-product")}
              >
                <Plus size={16} />
                Add Product
              </Button>
              <button className="mobile-logout" onClick={handleLogout}>
                <LogOut size={17} />
                Logout
              </button>
            </>
          ) : (
            <div className="mobile-auth-links">
              <NavLink to="/login" className={mobileLinkClass}>
                Login
              </NavLink>
              <NavLink to="/register" className={mobileLinkClass}>
                Register
              </NavLink>
            </div>
          )}
        </nav>
      )}
    </header>
  );
}

export default Navbar;
