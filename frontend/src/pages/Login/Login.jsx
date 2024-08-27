import React from "react";
import "../Register/Register.css";
import { Button, Image } from "@nextui-org/react";
import { Input } from "@nextui-org/react";
import { EyeFilledIcon } from "../Register/EyeFilledIcon";
import { EyeSlashFilledIcon } from "../Register/EyeSlashFilledIcon";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";
import { Divider } from "@nextui-org/divider";
import { Avatar } from "@nextui-org/react";

const Login = () => {
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
              <Input type="email" label="Email" fullWidth />
            </div>
            <div className="register-input">
              <Input
                label="Password"
                fullWidth
                // placeholder="Enter your password"
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
            <Button color="secondary" fullWidth>
              Sign In
            </Button>
            <Divider className="my-4" />
            <Button
              className="bg-neutral-900 text-white"
              variant="bordered"
              fullWidth
            >
              <Avatar
                src="https://static.vecteezy.com/system/resources/previews/013/760/951/original/colourful-google-logo-in-dark-background-free-vector.jpg"
                size="sm"
              />{" "}
              Or sign in with Google
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
