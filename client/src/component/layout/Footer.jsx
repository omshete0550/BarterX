// import { Instagram, Twitter, Facebook, Linkedin } from "lucide-react";

import { Link } from "react-router-dom";

import "../../styles/layout/footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Brand */}

        <div className="footer-brand">
          <Link to="/" className="footer-logo">
            <span className="footer-logo-mark">B</span>
            BARTER<span>X</span>
          </Link>

          <p>
            Barter smarter. Live better. Exchange what you have for what you
            want.
          </p>

          {/* <div className="footer-socials">
            <a href="#" aria-label="Instagram">
              <Instagram size={18} />
            </a>

            <a href="#" aria-label="Twitter">
              <Twitter size={18} />
            </a>

            <a href="#" aria-label="Facebook">
              <Facebook size={18} />
            </a>

            <a href="#" aria-label="LinkedIn">
              <Linkedin size={18} />
            </a>
          </div> */}
        </div>

        {/* Explore */}

        <div className="footer-column">
          <h3>Explore</h3>

          <Link to="/">Home</Link>
          <Link to="/products">Products</Link>
          <Link to="/wishlist">Wishlist</Link>
          <Link to="/categories">Categories</Link>
        </div>

        {/* Company */}

        <div className="footer-column">
          <h3>Company</h3>

          <Link to="/about">About Us</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/privacy">Privacy Policy</Link>
          <Link to="/terms">Terms & Conditions</Link>
        </div>

        {/* Support */}

        <div className="footer-column">
          <h3>Support</h3>

          <Link to="/help">Help Center</Link>
          <Link to="/safety">Safety Tips</Link>
          <Link to="/community">Community Guidelines</Link>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} BarterX. All rights reserved.</p>

        <p>Made for people who believe everything has value.</p>
      </div>
    </footer>
  );
}

export default Footer;
