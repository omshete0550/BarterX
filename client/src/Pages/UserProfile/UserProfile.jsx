import React from "react";
import "./UserProfile.css";
import { Link } from "react-router-dom";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";

const UserProfile = () => {
  return (
    <>
      <Navbar />

      <div className="UserTabPanel">
        <div className="TabHeading">
          <h4>Your Account</h4>
        </div>

        <div className="profileContainer">

          <Link to="/orders">
            <div className="profileCard">
              <div className="profileContentLogo">
                <img
                  src="https://m.media-amazon.com/images/G/31/x-locale/cs/ya/images/Box._CB485927553_.png"
                  alt=""
                />
              </div>
              <div className="profileContentConatainer">
                <h3>Your Orders</h3>
                <p>Track, return, or buy things again</p>
              </div>
            </div>
          </Link>

          <Link to="/edit-profile">
            <div className="profileCard">
              <div className="profileContentLogo">
                <img
                  src="https://m.media-amazon.com/images/G/31/x-locale/cs/ya/images/sign-in-lock._CB485931504_.png"
                  alt=""
                />
              </div>
              <div className="profileContentConatainer">
                <h3>Login & Security</h3>
                <p>Edit login, name, and mobile number</p>
              </div>
            </div>
          </Link>

          <Link to="/edit-address">
            <div className="profileCard">
              <div className="profileContentLogo">
                <img
                  src="https://m.media-amazon.com/images/G/31/x-locale/cs/ya/images/address-map-pin._CB485934183_.png"
                  alt=""
                />
              </div>
              <div className="profileContentConatainer">
                <h3>Your Addresses</h3>
                <p>Edit addresses for orders and gifts</p>
              </div>
            </div>
          </Link>

          <Link to="/orders">
            <div className="profileCard">
              <div className="profileContentLogo">
                <img
                  src="https://m.media-amazon.com/images/G/31/x-locale/cs/ya/images/Box._CB485927553_.png"
                  alt=""
                />
              </div>
              <div className="profileContentConatainer">
                <h3>Your Orders</h3>
                <p>Track, return, or buy things again</p>
              </div>
            </div>
          </Link>

          <Link to="/orders">
            <div className="profileCard">
              <div className="profileContentLogo">
                <img
                  src="https://m.media-amazon.com/images/G/31/x-locale/cs/ya/images/Box._CB485927553_.png"
                  alt=""
                />
              </div>
              <div className="profileContentConatainer">
                <h3>Your Orders</h3>
                <p>Track, return, or buy things again</p>
              </div>
            </div>
          </Link>

          <Link to="/orders">
            <div className="profileCard">
              <div className="profileContentLogo">
                <img
                  src="https://m.media-amazon.com/images/G/31/x-locale/cs/ya/images/Box._CB485927553_.png"
                  alt=""
                />
              </div>
              <div className="profileContentConatainer">
                <h3>Your Orders</h3>
                <p>Track, return, or buy things again</p>
              </div>
            </div>
          </Link>

          
        </div>
      </div>

      <Footer />
    </>
  );
};

export default UserProfile;
