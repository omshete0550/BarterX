import React, { useEffect, useState } from "react";
import { FaArrowLeft, FaSearch, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./NavbarL.css";
import "../Navbar/Navbar.css";
const NavbarL = () => {
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

    const searchBlock = document.querySelector(".search-block");
    const searchToggle = document.querySelector(".search-toggle");
    const searchCancel = document.querySelector(".search-cancel");

    if (searchToggle && searchCancel) {
      searchToggle.addEventListener("click", () => {
        searchBlock.classList.add("is-active");
      });

      searchCancel.addEventListener("click", () => {
        searchBlock.classList.remove("is-active");
      });
    }
  }, []);
  return (
    <>
      <header className="header" id="header">
        <nav className="navbar container">
          <Link to="/" className="brand">
            BarterX
          </Link>
          <div className="burger" id="burger">
            <span className="burger-line"></span>
            <span className="burger-line"></span>
            <span className="burger-line"></span>
          </div>
          <span className="overlay"></span>
          <div className={`menu ${isMenuActive ? "is-active" : ""}`} id="menu">
            <ul className="menu-inner">
              <li className="menu-item">
                <Link className="menu-link" to="/">
                  Home
                </Link>
              </li>
              <li className="menu-item">
                <Link className="menu-link" to="/">
                  Who It’s For
                </Link>
              </li>
              <li className="menu-item">
                <Link className="menu-link" to="/">
                  Where We Barter
                </Link>
              </li>
              <li className="menu-item menu-mob">
                <Link className="menu-link" to="/">
                  How It Works
                </Link>
              </li>
              <li className="menu-item menu-mob">
                <Link className="menu-link" to="/register">
                  Sign Up/Login
                </Link>
              </li>
            </ul>
          </div>
          <div className="menu" id="menu">
            <ul className="menu-inner">
              <li className="menu-item">
                <Link className="menu-link" to="/">
                  <div className="buttons">
                    <button className="btn">
                      <span></span>
                      <p
                        data-start="How It Works"
                        data-text="view more!"
                        data-title="How It Works"
                      ></p>
                    </button>
                  </div>
                </Link>
              </li>
              <li className="menu-item">
                <Link className="menu-link" to="/register">
                  <div className="loginContainerNav">
                    <button className="loginBtnNav">
                      <i>
                        <FaUser />
                      </i>
                      <p className="text">Sign Up/Login</p>
                    </button>
                  </div>
                </Link>
              </li>
            </ul>
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
    </>
  );
};

export default NavbarL;
