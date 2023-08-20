import React, { useEffect } from "react";
import { FaArrowLeft, FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./Navbar.css";
const Navbar = () => {
  useEffect(() => {
    const navbarMenu = document.getElementById("menu");
    const burgerMenu = document.getElementById("burger");
    const bgOverlay = document.querySelector(".overlay");

    if (burgerMenu && bgOverlay) {
      burgerMenu.addEventListener("click", () => {
        navbarMenu.classList.add("is-active");
        bgOverlay.classList.toggle("is-active");
      });

      bgOverlay.addEventListener("click", () => {
        navbarMenu.classList.remove("is-active");
        bgOverlay.classList.toggle("is-active");
      });
    }

    document.querySelectorAll(".menu-link").forEach((link) => {
      link.addEventListener("click", () => {
        navbarMenu.classList.remove("is-active");
        bgOverlay.classList.remove("is-active");
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
        <nav className="navbar NavContainer">
          <Link to="/" className="brand">
            BarterX
          </Link>
          <div className="burger" id="burger">
            <span className="burger-line"></span>
            <span className="burger-line"></span>
            <span className="burger-line"></span>
          </div>
          <span className="overlay"></span>
          <div className="menu" id="menu">
            <ul className="menu-inner">
              <li className="menu-item">
                <Link className="menu-link" to="/">
                  Home
                </Link>
              </li>
              <li className="menu-item">
                <Link className="menu-link" to="/">
                  About
                </Link>
              </li>
              <li className="menu-item">
                <Link className="menu-link" to="/">
                  Contact Us
                </Link>
              </li>
              <li className="menu-item">
                <Link className="menu-link" to="/">
                  Project
                </Link>
              </li>
              <li className="menu-item">
                <Link className="menu-link" to="/">
                  Support
                </Link>
              </li>
            </ul>
          </div>
          <span>
            <i>
              <FaSearch className="search-toggle" />
            </i>
          </span>
          <div className="search-block">
            <form className="search-form">
              <span>
                <i>
                  <FaArrowLeft className="search-cancel" />
                </i>
              </span>
              <input
                type="search"
                name="search"
                className="search-input"
                placeholder="Search here..."
              />
            </form>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Navbar;
