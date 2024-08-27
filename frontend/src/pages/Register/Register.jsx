import React, { useState } from "react";
import "./Register.css";
import { Button, Image } from "@nextui-org/react";
import { Input } from "@nextui-org/react";
import { EyeFilledIcon } from "./EyeFilledIcon";
import { EyeSlashFilledIcon } from "./EyeSlashFilledIcon";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";
import { Divider } from "@nextui-org/divider";
import { Avatar } from "@nextui-org/react";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../redux/apiCalls";

const Register = () => {
  // Integration
  const dispatch = useDispatch();
  const [credentials, setCredentials] = useState({
    username: undefined,
    email: undefined,
    phone: undefined,
    city: undefined,
    password: undefined,
  });

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = (e) => {
    e.preventDefault();
    register(dispatch, credentials);
    console.log('click')
  };

  const [isVisible, setIsVisible] = React.useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);
  return (
    <>
      <div className="register-container">
        <div className="register-img-container">
          <img
            src="https://www.bizzabo.com/wp-content/uploads/2018/10/12-Registration-Pages-for-Events-That-Convert_16x9.png"
            alt=""
          />
        </div>

        <div className="register-items-container">
          <div className="register-logo">
            <img src={logo} alt="" />
          </div>

          <div className="register-headline">
            <h2>Welcome! Nice to see you</h2>
          </div>

          <div>
            <div className="register-input">
              <Input
                type="name"
                label="Username"
                fullWidth
                onChange={handleChange}
                id="username"
              />
            </div>
            <div className="register-input">
              <Input
                type="email"
                id="email"
                label="Email"
                fullWidth
                onChange={handleChange}
              />
            </div>
            <div className="register-input">
              <Input
                type="text"
                id="city"
                label="City"
                fullWidth
                onChange={handleChange}
              />
            </div>
            <div className="register-input">
              <Input
                type="number"
                id="phone"
                label="Phone Number"
                fullWidth
                onChange={handleChange}
              />
            </div>
            <div className="register-input">
              <Input
                label="Password"
                id="password"
                fullWidth
                onChange={handleChange}
                endContent={
                  <button
                    className="focus:outline-none"
                    type="button"
                    onClick={toggleVisibility}
                    aria-label="toggle password visibility"
                  >
                    {isVisible ? (
                      <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                    ) : (
                      <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                    )}
                  </button>
                }
                type={isVisible ? "text" : "password"}
              />
            </div>
          </div>

          <div className="signup-btn">
            <Button color="secondary" fullWidth onClick={handleClick}>
              Sign Up
            </Button>
            {/* <Divider className="my-4" />
            <Button
              className="bg-neutral-900 text-white"
              variant="bordered"
              fullWidth
            >
              <Avatar
                src="https://static.vecteezy.com/system/resources/previews/013/760/951/original/colourful-google-logo-in-dark-background-free-vector.jpg"
                size="sm"
              />{" "}
              Or sign up with Google
            </Button> */}
          </div>

          <div className="signin-btn">
            <h4>
              Already Have An Account?{" "}
              <Link to="/login" style={{ color: "blue" }}>
                Sign In
              </Link>{" "}
            </h4>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
