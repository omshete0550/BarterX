import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, ArrowRight } from "lucide-react";

import AuthLayout from "../../layouts/AuthLayout";
import Button from "../../component/common/Button";
import Input from "../../component/common/Input";

import "./Auth.css";

function Login() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};

    if (!formData.email) {
      newErrors.email = "Email is required.";
    }

    if (!formData.password) {
      newErrors.password = "Password is required.";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      console.log("Login:", formData);

      // API call will go here later

      navigate("/");
    }
  };

  return (
    <AuthLayout>
      <div className="auth-card">
        <div className="auth-mobile-logo">
          <span>B</span>
          BARTER<span>X</span>
        </div>

        <div className="auth-heading">
          <h2>Welcome back!</h2>

          <p>Login to continue your BarterX journey.</p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <Input
            label="Email address"
            name="email"
            type="email"
            placeholder="you@example.com"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
            required
          />

          <div className="password-wrapper">
            <Input
              label="Password"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              error={errors.password}
              required
            />

            <button
              type="button"
              className="password-toggle"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <div className="auth-options">
            <label className="remember-me">
              <input type="checkbox" />
              <span>Remember me</span>
            </label>

            <Link to="/forgot-password">Forgot password?</Link>
          </div>

          <Button
            type="submit"
            size="large"
            fullWidth
            icon={<ArrowRight size={18} />}
          >
            Login
          </Button>
        </form>

        <div className="auth-divider">
          <span>or continue with</span>
        </div>

        {/* <button className="google-button">
          <Chrome size={18} />
          Continue with Google
        </button> */}

        <p className="auth-switch">
          Don't have an account?
          <Link to="/register">Create account</Link>
        </p>
      </div>
    </AuthLayout>
  );
}

export default Login;
