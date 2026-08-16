import { Link } from "react-router-dom";
import "../styles/layouts/AuthLayout.css";

function AuthLayout({ children }) {
  return (
    <div className="auth-layout">
      <div className="auth-brand-section">
        <Link to="/" className="auth-logo">
          <span className="auth-logo-mark">B</span>
          <span>
            BARTER<span>X</span>
          </span>
        </Link>

        <div className="auth-brand-content">
          <span className="auth-badge">✦ Trusted Barter Community</span>

          <h1>
            Barter Smarter.
            <br />
            <span>Live Better.</span>
          </h1>

          <p>
            Discover products you love, exchange what you have, and connect with
            people in your community.
          </p>

          <div className="auth-stats">
            <div>
              <strong>10K+</strong>
              <span>Users</span>
            </div>

            <div>
              <strong>25K+</strong>
              <span>Products</span>
            </div>

            <div>
              <strong>5K+</strong>
              <span>Swaps</span>
            </div>
          </div>
        </div>

        <div className="auth-decoration auth-decoration-one" />
        <div className="auth-decoration auth-decoration-two" />
      </div>

      <div className="auth-form-section">{children}</div>
    </div>
  );
}

export default AuthLayout;
