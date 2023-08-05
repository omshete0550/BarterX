import React from "react";
import { Link } from "react-router-dom";
import "../Login/Login.css";
import { TfiEmail, TfiLocationPin, TfiLock, TfiUser } from "react-icons/tfi";

const Register = () => {
  const namePattern = /^[A-Za-z\s]+$/;

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log("success");
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
              <header className="header">Register Now</header>
              <header className="subHeader">
                Welcome to <b>BarterX!</b> Please Enter your Details
              </header>
              <form onSubmit={handleSubmit}>
                <div className="inputContainer">
                  <label className="label" htmlFor="Name">
                    <i>
                      <TfiUser />
                    </i>
                    <span>Name*</span>
                  </label>
                  <input
                    type="text"
                    className="input"
                    id="name"
                    placeholder="Enter your name"
                    name="name"
                    pattern={namePattern}
                    required
                  />
                </div>
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
                    id="password"
                    name="password"
                    placeholder="Enter your Password"
                    required
                  />
                </div>
                <div className="inputContainer">
                  <label className="label" htmlFor="Name">
                    <i>
                      <TfiLocationPin />
                    </i>
                    <span>Pincode*</span>
                  </label>
                  <input
                    type="number"
                    className="input"
                    id="pincode"
                    placeholder="Enter your pincode"
                    name="pincode"
                    min={100000}
                    max={999999}
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
                    <label for="RememberMe">Remember me</label>
                  </div>
                </div>
                <button className="LoginButton">Register</button>
                <div className="HaveAnAcc">
                  <span>
                    {" "}
                    Already have an account?{" "}
                    <Link to="/login" style={{ color: "#5b80d1" }}>
                      Sign In
                    </Link>
                  </span>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
