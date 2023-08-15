import React, { useEffect } from "react";
import "./Landing.css";
import NavbarL from "../../Components/NavbarL/NavbarL";
import banner1 from "../../assets/banner1.png";
import banner2 from "../../assets/Banner2.png";
import landing_vector from "../../assets/landing_vector_img (2).png";
import Footer from "../../Components/Footer/Footer";

const Landing = () => {
  return (
    <>
      <NavbarL />

      <div className="row LandingSec1">
        <div className="img_sec1">
          <img src={landing_vector} alt="" />
        </div>
        <div className="content_sec1">
          <h1>
            We connect you to <br />
            people around you to <br />
            <span className="underlined">barterX items</span> with
          </h1>
          <p>
            Our feed is filled with listed items by varoius <br />
            people all over the country
          </p>
          <div className="searchbox-wrap">
            <input type="text" placeholder="Input your email address" />
            <button>
              <span>Sign Up</span>{" "}
            </button>
          </div>
        </div>
      </div>


      <div className="LandingSec2">
        <div className="LandingSec2_heading">
          <h3>Introduction</h3>
          <h1>Why BarterX?</h1>
        </div>
        <div className="LandingSec2_content">
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Pariatur officiis odit omnis perferendis, quasi non maiores? Maiores recusandae nam magni eveniet quod minima, suscipit eligendi omnis dignissimos cumque doloribus. Magni accusantium assumenda reprehenderit quisquam voluptate natus tempora cupiditate similique! Quia veniam possimus autem expedita? Nulla eaque libero consequuntur fugit perferendis!
          </p>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Landing;
