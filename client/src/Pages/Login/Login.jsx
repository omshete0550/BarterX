import React, { useState } from "react";
import { Link } from "react-router-dom";
import ForgotPasswordPopup from "./ForgotPasswordPopup";
import "../Login/Login.css";
import { TfiEmail, TfiLock } from "react-icons/tfi";

const Login = () => {
  const [showForgotPasswordPopup, setShowForgotPasswordPopup] = useState(false);

  const handleForgotPasswordClick = () => {
    setShowForgotPasswordPopup(true);
  };

  const handleClosePopup = () => {
    setShowForgotPasswordPopup(false);
  };

  return (
    <>
      <div className="LoginPageContainer">
        <div className="LoginPageInnerContainer">
          <div className="ImageContianer">
            <img src="https://i.imgur.com/MYZd7of.png" className="GroupImage" />
          </div>

          <div className="LoginFormContainer">
            <div className="LoginFormInnerContainer">
              <header className="header">Log in</header>
              <header className="subHeader">
                Welcome to <b>BarterX!</b> Please Enter your Details
              </header>
              <form>
                <div className="inputContainer">
                  <label className="label" htmlFor="emailAddress">
                    <i>
                      <TfiEmail />
                    </i>
                    <span>Email Address*</span>
                  </label>
                  <input
                    type="email"
                    className="input"
                    id="emailAddress"
                    name="email"
                    placeholder="Enter your Email Address"
                    required
                  />
                </div>
                <div className="inputContainer">
                  <label className="label" htmlFor="emailAddress">
                    <i>
                      <TfiLock />
                    </i>
                    <span>Password*</span>
                  </label>
                  <input
                    type="password"
                    className="input"
                    id="emailAddress"
                    name="password"
                    placeholder="Enter your Password"
                    required
                  />
                </div>
                <div className="OptionsContainer">
                  <div className="checkboxContainer">
                    <input
                      type="checkbox"
                      id="RememberMe"
                      className="checkbox"
                    />
                    <label htmlFor="RememberMe">Remember me</label>
                  </div>
                  <a
                    href="#"
                    className="ForgotPasswordLink"
                    onClick={handleForgotPasswordClick}
                  >
                    Forgot Password?
                  </a>
                </div>
                <button className="LoginButton">Login</button>
                <div className="HaveAnAcc">
                  <span>
                    {" "}
                    Don't have an account?{" "}
                    <Link to="/register" style={{ color: "#31708e" }}>
                      Sign Up
                    </Link>
                  </span>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {showForgotPasswordPopup && (
        <ForgotPasswordPopup onClose={handleClosePopup} />
      )}
    </>
  );
};

export default Login;
