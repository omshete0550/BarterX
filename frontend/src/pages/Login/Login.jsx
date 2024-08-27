import React, { useState } from "react";
import "../Register/Register.css";
import { Button, Image } from "@nextui-org/react";
import { Input } from "@nextui-org/react";
import { EyeFilledIcon } from "../Register/EyeFilledIcon";
import { EyeSlashFilledIcon } from "../Register/EyeSlashFilledIcon";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";
import { Divider } from "@nextui-org/divider";
import { Avatar } from "@nextui-org/react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/apiCalls";

const Login = () => {
  // Integration

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { isFetching, error } = useSelector((state) => state.user);
  const handleClick = (e) => {
    e.preventDefault();
    login(dispatch, { username, password });
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
            <h2>Nice to see you again.</h2>
          </div>

          <div>
            <div className="register-input">
              <Input
                type="text"
                label="Username"
                fullWidth
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="register-input">
              <Input
                label="Password"
                fullWidth
                onChange={(e) => setPassword(e.target.value)}
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
            <Button color="secondary" fullWidth disabled={isFetching} onClick={handleClick}>
              Sign In
            </Button>
          </div>

          <div className="signin-btn">
            <h4>
              Don't Have An Account?{" "}
              <Link to="/register" style={{ color: "blue" }}>
                Sign Up
              </Link>{" "}
            </h4>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
