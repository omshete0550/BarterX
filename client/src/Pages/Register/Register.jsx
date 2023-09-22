import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../Login/Login.css";
import { TfiEmail, TfiLocationPin, TfiLock, TfiUser } from "react-icons/tfi";

const Register = () => {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [pincode, setPincode] = useState("");
  const [isUsernameCorrect, setIsUsernameCorrect] = useState(false);

  const [passwordStrength, setPasswordStrength] = useState("");

  const checkPasswordStrength = (password) => {
    const strongRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    if (strongRegex.test(password)) {
      setPasswordStrength("strong");
    } else {
      setPasswordStrength("weak");
    }
  };

  const onChange = (e) => {
    const newUsername = e.target.value;
    setUsername(newUsername);
    usernameValidator(newUsername);
  };

  const usernameValidator = (username) => {
    var usernameRegex =
      /^[a-zA-Z0-9]+([a-zA-Z0-9](_|-| )[a-zA-Z0-9])*[a-zA-Z0-9]+$/;
    if (usernameRegex.test(username)) {
      setIsUsernameCorrect(true);
    } else {
      setIsUsernameCorrect(false);
    }
    console.log(isUsernameCorrect);
  };


  async function registerUser(event){
    event.preventDefault();
    const response = await fetch('http://localhost:8800/api/register',{
    method: 'POST',  
    headers:{
        'Content-Type':'application/json',
      },
      body: JSON.stringify({
        name, 
        email, 
        password, 
        pincode}),
    })

    const data = await response.json();
    if(data.status === 'ok'){
      window.location.href='/login';
    }
    else{
      window.location.reload();
    }
    console.log(data);
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
              <header className="Loginheader">Register Now</header>
              <header className="subHeader">
                Welcome to <b>BarterX!</b> Please Enter your Details
              </header>
              <form onSubmit={registerUser}>
                <div className="inputContainer" >
                  <label className="label" htmlFor="Name">
                    <i>
                      <TfiUser />
                    </i>
                    <span>Name*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={name}
                    placeholder="Enter your name"
                    onChange={(e) => setName(e.target.value)}
                    className="input"
                    id="name"
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
                    // type="email"
                    // value={email}
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
                  <label className="label" htmlFor="password">
                    <i>
                      <TfiLock />
                    </i>
                    <span>Password*</span>
                  </label>
                  <input
                    // type="password"
                    // value={password}
                    // className="input"
                    // id="password"
                    // name="password"
                    // placeholder="Enter your Password"
                    // required
                    // onChange={(e) => checkPasswordStrength(e.target.value)}
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
                {passwordStrength && (
                  <div className={`passwordStrength ${passwordStrength}`}>
                    {passwordStrength === "strong"
                      ? "Strong Password"
                      : "Weak Password"}
                  </div>
                )}
                <div className="inputContainer">
                  <label className="label" htmlFor="Name">
                    <i>
                      <TfiLocationPin />
                    </i>
                    <span>Pincode*</span>
                  </label>
                  <input
                    type="number"
                    value={pincode}
                    name="pincode"
                    placeholder="Enter your pincode"
                    onChange={(e) => setPincode(e.target.value)}
                    pattern="[0-9]{4}"
                    minLength={6}
                    maxLength={6}
                    className="input"
                    id="pincode"
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
                <input type="submit" className="LoginButton" value='Register'></input>

                {/* <button className="LoginButton">Register</button> */}
                
                <div className="HaveAnAcc">
                  <span>
                    {" "}
                    Already have an account?{" "}
                    <Link to="/login" style={{ color: "#001451" }}>
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
