import React from 'react';
import { Link } from 'react-router-dom';
import '../Login/Login.css';

const Login = () => {

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
              <header className="subHeader">Welcome to <b>BarterX!</b> Please Enter your Details</header>
              <form>
                <div className="inputContainer">
                  <label className="label" htmlFor="emailAddress">
                    <img src="https://i.imgur.com/Hn13wvm.png" className="labelIcon" />
                    <span>Email Address*</span>
                  </label>
                  <input type="email" className="input" id="emailAddress" name='email'  placeholder="Enter your Email Address"/>
                </div>
                <div className="inputContainer">
                  <label className="label" htmlFor="emailAddress">
                    <img src="https://i.imgur.com/g5SvdfG.png" className="labelIcon" />
                    <span>Password*</span>
                  </label>
                  <input type="password" className="input" id="emailAddress" name='password' placeholder="Enter your Password" />
                </div>
                <div className="OptionsContainer">
                  <div className="checkboxContainer">
                    <span> Don't have an account? <Link to="/register">Sign Up</Link> </span>
                  </div>
                  <a href="#" className="ForgotPasswordLink">Forgot Password?</a>
                </div>
                <button className="LoginButton">Login</button>
              </form>

            </div>

          </div>
        </div>
      </div>


    </>
  )
}

export default Login