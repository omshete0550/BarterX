import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Eye, EyeOff, ArrowRight } from "lucide-react";

import AuthLayout from "../../layouts/AuthLayout";
import Button from "../../component/common/Button";
import Input from "../../component/common/Input";
import { clearAuthError, login } from "../../features/auth/authSlice";

import "./Auth.css";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { loading, error: apiError } = useSelector((state) => state.auth);

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
    if (apiError) dispatch(clearAuthError());
  };

  const handleSubmit = async (e) => {
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
      const result = await dispatch(login(formData));
      if (login.fulfilled.match(result)) {
        const from = location.state?.from?.pathname || "/";
        navigate(from, { replace: true });
      }
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
          {apiError && <p className="auth-server-error">{apiError}</p>}
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
              aria-label={showPassword ? "Hide password" : "Show password"}
              title={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <div className="auth-options">
            <Link to="/forgot-password">Forgot password?</Link>
          </div>

          <Button
            type="submit"
            size="large"
            fullWidth
            icon={<ArrowRight size={18} />}
            loading={loading}
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
