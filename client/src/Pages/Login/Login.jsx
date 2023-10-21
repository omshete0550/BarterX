import React, { useState } from "react";
// import { Link } from "react-router-dom";
import { Link } from "react-router-dom"; // Import useHistory
import ForgotPasswordPopup from "./ForgotPasswordPopup";
import "../Login/Login.css";
import { TfiEmail, TfiLock } from "react-icons/tfi";

const Login = () => {
  const [showForgotPasswordPopup, setShowForgotPasswordPopup] = useState(false);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  // const history = useHistory(); // Initialize useHistory
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login status
  const [accountName, setAccountName] = useState(""); // Store account name

  const handleForgotPasswordClick = () => {
    setShowForgotPasswordPopup(true);
  };

  const handleClosePopup = () => {
    setShowForgotPasswordPopup(false);
  };

  async function loginUser(event) {
    event.preventDefault();
    const response = await fetch('http://localhost:8800/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password
      }),
    })

    const data = await response.json()
    if (data.user) {
      alert("Login Successfully logged in!");
      localStorage.setItem("token", data.user);
      window.location.href = `/addproduct?userid=${data.user}`;

      // // history.push("/home"); // Replace "/home" with your actual route for the Home page
      // setIsLoggedIn(true);
      // setAccountName(data.user.name); // Set the account name
      // response.redirect("/home");
      localStorage.setItem("token", data.user);
    }
    else {
      alert("Please check your username and password & Try Again!");
    }
  }

  return (
    <>
      <div className="LoginPageContainer">
        <div className="LoginPageInnerContainer">
          <div className="ImageContianer">
            <img src="https://i.imgur.com/MYZd7of.png" className="GroupImage" />
          </div>

          <div className="LoginFormContainer">
            <div className="LoginFormInnerContainer">
              <header className="Loginheader">Log in</header>
              <header className="subHeader">
                Welcome to <b>BarterX!</b> Please Enter your Details
              </header>
              <form onSubmit={loginUser}>
                <div className="inputContainer">
                  <label className="label" htmlFor="emailAddress">
                    <i>
                      <TfiEmail />
                    </i>
                    <span>Email Address*</span>
                  </label>
                  <input
                    // type="email"
                    // className="input"
                    // id="emailAddress"
                    // name="email"
                    // placeholder="Enter your Email Address"
                    // required
                    type="email"
                    name="email"
                    value={email}
                    placeholder="Enter your Email Address"
                    onChange={(e) => setEmail(e.target.value)}
                    className="input"
                    id="emailAddress"
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
                    // type="password"
                    // className="input"
                    // id="emailAddress"
                    // name="password"
                    // placeholder="Enter your Password"
                    // required
                    type="password"
                    name="password"
                    value={password}
                    placeholder="Enter your Password"
                    onChange={(e) => setPassword(e.target.value)}
                    className="input"
                    id="password"
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
                {/* <button className="LoginButton">Login</button> */}
                <input type="submit" className="LoginButton" value="Login"></input>
                <div className="HaveAnAcc">
                  <span>
                    {" "}
                    Don't have an account?{" "}
                    <Link to="/register" style={{ color: "#001451" }}>
                      Sign Up
                    </Link>
                  </span>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* {showForgotPasswordPopup && (
        <ForgotPasswordPopup onClose={handleClosePopup} />
      )} */}

    </>
  );
};

export default Login;
