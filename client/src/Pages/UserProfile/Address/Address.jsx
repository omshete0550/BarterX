import React, { useState } from "react";
import Navbar from "../../../Components/Navbar/Navbar";
import Footer from "../../../Components/Footer/Footer";
import "./Address.css";

const Address = () => {
  const [isSectionVisible, setIsSectionVisible] = useState(false);

  const toggleSection = () => {
    setIsSectionVisible(!isSectionVisible);
  };

  return (
    <>
      <Navbar />

      <section className="AddedAddressContainer">
        <h2>Your Address</h2>
        <div className="AddedAddress">
          <div className="addedAddressCard">
            <h3>Om Shete</h3>
            <p>
              205,Govind dham tower
              <br /> Manjarli road <br />
              BADLAPUR, MAHARASHTRA 421503
              <br />
              India
            </p>
            <span>Phone number: 7798283084</span>

            <div className="addressBtnDiv">
              <button>Edit</button>
              <button>Remove</button>
            </div>
          </div>

          <div className="addedAddressCard">
            <h3>Om Shete</h3>
            <p>
              205,Govind dham tower
              <br /> Manjarli road <br />
              BADLAPUR, MAHARASHTRA 421503
              <br />
              India
            </p>
            <span>Phone number: 7798283084</span>

            <div className="addressBtnDiv">
              <button>Edit</button>
              <button>Remove</button>
            </div>
          </div>

          <div className="addedAddressCard addedAddressCardAdding">
            <h1>Add Address</h1>
            <button onClick={toggleSection}>+</button>
          </div>
        </div>
      </section>
      {isSectionVisible && (
        <section className="AddressContainerSection">
          <div className="AddressContainer">
            <h1>Add Your Shipping Address</h1>
            <p>Please enter your shipping details.</p>
            <hr />
            <div className="form">
              <div className="fields fields--2">
                <label className="field">
                  <span className="field__label" for="firstname">
                    First name
                  </span>
                  <input
                    className="field__input"
                    type="text"
                    id="firstname"
                    placeholder="John"
                  />
                </label>
                <label className="field">
                  <span className="field__label" for="lastname">
                    Last name
                  </span>
                  <input
                    className="field__input"
                    type="text"
                    id="lastname"
                    placeholder="Doe"
                  />
                </label>
              </div>
              <label className="field">
                <span className="field__label" for="address">
                  Address
                </span>
                <textarea className="field__input" type="text" id="address" />
              </label>
              <label className="field">
                <span className="field__label" for="country">
                  Country
                </span>
                <select className="field__input" id="country">
                  <option value=""></option>
                  <option value="unitedstates">United States</option>
                </select>
              </label>
              <div className="fields fields--3">
                <label className="field">
                  <span className="field__label" for="zipcode">
                    Zip code
                  </span>
                  <input className="field__input" type="text" id="zipcode" />
                </label>
                <label className="field">
                  <span className="field__label" for="city">
                    City
                  </span>
                  <input className="field__input" type="text" id="city" />
                </label>
                <label className="field">
                  <span className="field__label" for="state">
                    State
                  </span>
                  <select className="field__input" id="state">
                    <option value=""></option>
                  </select>
                </label>
              </div>
            </div>
            <hr />
            <button className="Addressbutton">Continue</button>
          </div>
        </section>
      )}
      <Footer />
    </>
  );
};

export default Address;
