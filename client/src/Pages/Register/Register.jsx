import React from 'react';
import { Link } from 'react-router-dom';
import '../Login/Login.css';
import { TfiEmail, TfiLocationPin, TfiLock, TfiUser } from 'react-icons/tfi'

const Register = () => {

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
              <header className="subHeader">Welcome to <b>BarterX!</b> Please Enter your Details</header>
              <form>
                <div className="inputContainer">
                    <label className="label" htmlFor="Name">
                        <i><TfiUser /></i>
                        <span>Name*</span>
                    </label>
                    <input type="text" className="input" id="emailAddress" placeholder="Enter your name" name='name' />
                </div>
                <div className="inputContainer">
                  <label className="label" htmlFor="emailAddress">
                    <i><TfiEmail /></i>
                    <span>Email Address*</span>
                  </label>
                  <input type="email" className="input" id="emailAddress" name='email'  placeholder="Enter your Email Address"/>
                </div>
                <div className="inputContainer">
                  <label className="label" htmlFor="emailAddress">
                    <i><TfiLock /></i>
                    <span>Password*</span>
                  </label>
                  <input type="password" className="input" id="emailAddress" name='password' placeholder="Enter your Password" />
                </div>
                <div className="inputContainer">
                    <label className="label" htmlFor="Name">
                        <i><TfiLocationPin /></i>
                        <span>Pincode*</span>
                    </label>
                    <input type="number" className="input" id="emailAddress" placeholder="Enter your pincode" name='name' />
                </div>
                <div className="OptionsContainer">
                  <div className="checkboxContainer">
                    <span> Have an account? <Link to="/login">Sign In</Link> </span>
                  </div>
                  {/* <a href="#" className="ForgotPasswordLink">Forgot Password?</a> */}
                </div>
                <button className="LoginButton">Register</button>
              </form>

            </div>

          </div>
        </div>
      </div>


    </>
  )
}

export default Register