import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Eye, EyeOff, ArrowRight } from "lucide-react";

import AuthLayout from "../../layouts/AuthLayout";
import Button from "../../component/common/Button";
import Input from "../../component/common/Input";
import { clearAuthError, register } from "../../features/auth/authSlice";

import "./Auth.css";

function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error: apiError } = useSelector((state) => state.auth);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
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

    if (!formData.name) {
      newErrors.name = "Full name is required.";
    }

    if (!formData.email) {
      newErrors.email = "Email is required.";
    }

    if (!formData.password) {
      newErrors.password = "Password is required.";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters.";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password.";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      // confirmPassword is only needed in the UI, not by the API.
      const userDetails = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      };
      const result = await dispatch(register(userDetails));
      if (register.fulfilled.match(result)) navigate("/");
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
          <h2>Create your account</h2>

          <p>Join BarterX and start swapping smarter.</p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          {apiError && <p className="auth-server-error">{apiError}</p>}
          <Input
            label="Full name"
            name="name"
            placeholder="John Doe"
            value={formData.name}
            onChange={handleChange}
            error={errors.name}
            required
          />

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
              placeholder="Create a password"
              value={formData.password}
              onChange={handleChange}
              error={errors.password}
              helperText="Use at least 8 characters."
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

          <div className="password-wrapper">
            <Input
              label="Confirm password"
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={handleChange}
              error={errors.confirmPassword}
              required
            />

            <button
              type="button"
              className="password-toggle"
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              aria-label={
                showConfirmPassword ? "Hide confirm password" : "Show confirm password"
              }
              title={
                showConfirmPassword ? "Hide confirm password" : "Show confirm password"
              }
            >
              {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <label className="terms-checkbox">
            <input type="checkbox" required />

            <span>
              I agree to the <Link to="/terms">Terms & Conditions</Link> and{" "}
              <Link to="/privacy">Privacy Policy</Link>.
            </span>
          </label>

          <Button
            type="submit"
            size="large"
            fullWidth
            icon={<ArrowRight size={18} />}
            loading={loading}
          >
            Create Account
          </Button>
        </form>

        <div className="auth-divider">
          <span>or continue with</span>
        </div>

        {/* <button className="google-button">
          <Chrome size={18} />
          Sign up with Google
        </button> */}

        <p className="auth-switch">
          Already have an account?
          <Link to="/login">Login</Link>
        </p>
      </div>
    </AuthLayout>
  );
}

export default Register;
