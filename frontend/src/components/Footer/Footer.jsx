import React from "react";
import "./Footer.css";
import { Avatar, Image } from "@nextui-org/react";
import app_download from "../../assets/app_download.png";
const Footer = () => {
  return (
    <>
      <footer className="footer">
        <div className="footerContainer">
          <div className="footerRow">
            <div className="footer-col">
              <h4>Account</h4>
              <ul>
                <li>
                  <a href="#">My Account</a>
                </li>
                <li>
                  <a href="#">Login / Register</a>
                </li>
                <li>
                  <a href="#">Cart</a>
                </li>
                <li>
                  <a href="#">Wishlist</a>
                </li>
                <li>
                  <a href="#">Shop</a>
                </li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>Quick Links</h4>
              <ul>
                <li>
                  <a href="#">Privacy Policy</a>
                </li>
                <li>
                  <a href="#">Terms Of Use</a>
                </li>
                <li>
                  <a href="#">FAQ</a>
                </li>
                <li>
                  <a href="#">Contact</a>
                </li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>Support</h4>
              <ul>
                <li>
                  <a href="#">111 BarterX, Mumbai, India.</a>
                </li>
                <li>
                  <a href="#">barterx@gmail.com</a>
                </li>
                <li>
                  <a href="#">+91 78955 23115</a>
                </li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>Download App</h4>
              <div>
                <Image
                  width={200}
                  alt="NextUI hero Image"
                  src={app_download}
                  className="mb-5"
                />
              </div>
              <div className="flex gap-3 items-center">
                <Avatar src="https://cdn.pixabay.com/photo/2021/06/15/12/14/instagram-6338393_1280.png" />
                <Avatar src="https://cdn.pixabay.com/photo/2021/06/15/12/51/facebook-6338507_1280.png" />
                <Avatar src="https://static.dezeen.com/uploads/2023/07/x-logo-twitter-elon-musk_dezeen_2364_col_0.jpg" />
                <Avatar src="https://cdn-icons-png.flaticon.com/512/174/174857.png" />
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
