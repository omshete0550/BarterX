import React from "react";
import Navbar from "../../../Components/Navbar/Navbar";
import Footer from "../../../Components/Footer/Footer";
import "../Orders/Orders.css";

const Ads = () => {
  return (
    <>
      <Navbar />

      <h1 className="OrderHistoryHeading">Your Ads</h1>

      <section className="orderHistory">

        <div className="OrderHistoryCard">

          <div className="orderNavBar">
            <div className="OrderNavBarContent">
              <div className="OrderNavBarContentInner">
                <h4>Order Number</h4>
                <p>#A915AFLE4FO</p>
              </div>
              <div className="OrderNavBarContentInner">
                <h4>Date</h4>
                <p>Aug 5th, 2023</p>
              </div>
              <div className="OrderNavBarContentInner">
                <h4>Swapped For</h4>
                <p>Table</p>
              </div>
              <div className="OrderNavBarContentInner">
                <h4>Shipped To</h4>
                <p>Late M. Night</p>
              </div>
            </div>
            <div className="OrderNavBarbtn">
              <button>View Order</button>
            </div>
          </div>

          <div className="HistoryMainContent">

            <div className="ShipmentContainer">
                <div className="shipped">
                    <h3>Shipped</h3>
                    <p>Est. delivery between Aug 5 - Aug 9th, 2023</p>
                </div>
                <div className="Trackshipped">
                    <button>Track Shipment</button>
                </div>
            </div>

            <div className="OrderHistoryContent">
                <div className="OrderHistoryContentCard">
                    <span><strong>Seller:</strong> Sofa</span>

                    <span><strong>Buyer:</strong> Dinning Table</span>

                </div>
            </div>

          </div>
        </div>

        <div className="OrderHistoryCard">

          <div className="orderNavBar">
            <div className="OrderNavBarContent">
              <div className="OrderNavBarContentInner">
                <h4>Order Number</h4>
                <p>#A915AFLE4FO</p>
              </div>
              <div className="OrderNavBarContentInner">
                <h4>Date</h4>
                <p>Aug 5th, 2023</p>
              </div>
              <div className="OrderNavBarContentInner">
                <h4>Swapped For</h4>
                <p>Table</p>
              </div>
              <div className="OrderNavBarContentInner">
                <h4>Shipped To</h4>
                <p>Late M. Night</p>
              </div>
            </div>
            <div className="OrderNavBarbtn">
              <button>View Order</button>
            </div>
          </div>

          <div className="HistoryMainContent">

            <div className="ShipmentContainer">
                <div className="shipped deliverd">
                    <h3>Deliverd</h3>
                    <p>Deliverd on July 25, 2023</p>
                </div>
                <div className="Trackshipped">
                    <button>Track Shipment</button>
                </div>
            </div>

            <div className="OrderHistoryContent">
                <div className="OrderHistoryContentCard">
                    <span><strong>Seller:</strong> Sofa</span>

                    <span><strong>Buyer:</strong> Dinning Table</span>

                </div>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Ads;
