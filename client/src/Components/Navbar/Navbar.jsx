import React, { useEffect, useLayoutEffect, useState } from "react";
import { FaShoppingCart, FaUser, FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import logo from '../../assets/logo.png'
import "./Navbar.css";
const Navbar = () => {
  const [isMenuActive, setIsMenuActive] = useState(false);
  const toggleMenu = () => {
    setIsMenuActive(!isMenuActive);
  };

  useEffect(() => {
    const navbarMenu = document.getElementById("menu");
    const burgerMenu = document.getElementById("burger");
    const bgOverlay = document.querySelector(".overlay");

    if (burgerMenu && bgOverlay) {
      burgerMenu.addEventListener("click", toggleMenu);

      bgOverlay.addEventListener("click", () => {
        setIsMenuActive(false);
      });
    }

    document.querySelectorAll(".menu-link").forEach((link) => {
      link.addEventListener("click", () => {
        setIsMenuActive(false);
      });
    });
  }, []);

  const [showBoxShadow, setShowBoxShadow] = useState(false);
  const handleScroll = () => {
    setShowBoxShadow(window.scrollY > 0);
  };

  useEffect(() => {
    // Add scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Clean up event listener
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <header className={`header ${showBoxShadow ? "sticky" : ""}`} id="header">
        <nav className="navbar NavContainer">
          <Link to="/" className="brand">
            <img src={logo} alt="" />
          </Link>
          <div className="burger" id="burger">
            <span className="burgerLine1"></span>
            <span className="burgerLine2"></span>
            <span className="burgerLine3"></span>
          </div>
          <span className="overlay"></span>
          <div className={`menu ${isMenuActive ? "is-active" : ""}`} id="menu">
            <ul className="menu-inner">
              <li className="menu-item">
                <Link className="menu-link" to="/home">
                  Category
                </Link>
              </li>
              <li className="menu-item">
                <Link className="menu-link" to="/">
                  What's New
                </Link>
              </li>
              <li className="menu-item">
                <Link className="menu-link" to="/">
                  Deals
                </Link>
              </li>
              <li className="menu-item">
                <Link className="menu-link" to="/">
                  Delivery
                </Link>
              </li>
              <li className="menu-item">
                <div className="InputSearchContainer">
                  <input
                    type="text"
                    name="text"
                    className="input"
                    id="input"
                    placeholder="Search"
                  />

                  <label htmlFor="inputSearch" className="labelforsearch">
                    <svg viewBox="0 0 512 512" className="searchIcon">
                      <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"></path>
                    </svg>
                  </label>
                  <div className="border"></div>

                  <button className="micButton">
                    <svg viewBox="0 0 384 512" className="micIcon">
                      <path d="M192 0C139 0 96 43 96 96V256c0 53 43 96 96 96s96-43 96-96V96c0-53-43-96-96-96zM64 216c0-13.3-10.7-24-24-24s-24 10.7-24 24v40c0 89.1 66.2 162.7 152 174.4V464H120c-13.3 0-24 10.7-24 24s10.7 24 24 24h72 72c13.3 0 24-10.7 24-24s-10.7-24-24-24H216V430.4c85.8-11.7 152-85.3 152-174.4V216c0-13.3-10.7-24-24-24s-24 10.7-24 24v40c0 70.7-57.3 128-128 128s-128-57.3-128-128V216z"></path>
                    </svg>
                  </button>
                </div>
              </li>
              <li className="menu-item menu-mob">
                <Link className="menu-link" to="/">
                  Account
                </Link>
              </li>
              <li className="menu-item menu-mob">
                <Link className="menu-link" to="/register">
                  Cart
                </Link>
              </li>
            </ul>
          </div>
          <div className="userAcc">
            <div className="UserAccItem">
              <i>
                <FaUser />
              </i>
              <p>Account</p>
            </div>
            <div className="UserAccItem">
              <i>
                <FaShoppingCart />
              </i>
              <p>Cart</p>
            </div>
          </div>
          {/* Close button */}
          {isMenuActive && (
            <button
              className="close-menu"
              onClick={() => setIsMenuActive(false)}
            >
              <i className="close-icon">X</i>
            </button>
          )}
        </nav>
      </header>
      {/* <div className="navbarHome">
        <div className="BarterLogo">
          <p>BarterX</p>
        </div>
        <div className="navItemsHome">
          <ul>
            <li>Category</li>
            <li>Deals</li>
            <li>What's New</li>
            <li>Delivery</li>
            <li>
              <div className="InputSearchContainer">
                <input
                  type="text"
                  name="text"
                  className="input"
                  id="input"
                  placeholder="Search"
                />

                <label for="inputSearch" className="labelforsearch">
                  <svg viewBox="0 0 512 512" className="searchIcon">
                    <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"></path>
                  </svg>
                </label>
                <div className="border"></div>

                <button className="micButton">
                  <svg viewBox="0 0 384 512" className="micIcon">
                    <path d="M192 0C139 0 96 43 96 96V256c0 53 43 96 96 96s96-43 96-96V96c0-53-43-96-96-96zM64 216c0-13.3-10.7-24-24-24s-24 10.7-24 24v40c0 89.1 66.2 162.7 152 174.4V464H120c-13.3 0-24 10.7-24 24s10.7 24 24 24h72 72c13.3 0 24-10.7 24-24s-10.7-24-24-24H216V430.4c85.8-11.7 152-85.3 152-174.4V216c0-13.3-10.7-24-24-24s-24 10.7-24 24v40c0 70.7-57.3 128-128 128s-128-57.3-128-128V216z"></path>
                  </svg>
                </button>
              </div>
            </li>
          </ul>
        </div>
        <div className="userAcc">
          <div className="UserAccItem">
            <i><FaUser /></i>
            <p>Account</p>
          </div>
          <div className="UserAccItem">
            <i><FaShoppingCart /></i>
            <p>Cart</p>
          </div>
        </div>
      </div> */}
    </>
  );
};

export default Navbar;
