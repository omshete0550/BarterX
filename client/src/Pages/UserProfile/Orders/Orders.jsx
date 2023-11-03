import React, { useEffect, useState } from "react";
import Navbar from "../../../Components/Navbar/Navbar";
import Footer from "../../../Components/Footer/Footer";
import "./Orders.css";
import axios from "axios";

const Orders = () => {
  const userId = localStorage.getItem("token");
  const [orders, setOrders] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await axios.get(`http://localhost:8800/api/products/barter/success/${userId}`);
        const orders = userData.data;

        const updatedOrders = await Promise.all(
          orders.map(async (order) => {
            const desiredItemData = await axios.get(`http://localhost:8800/api/getproductdetails/${order.desiredItem}`);
            const myItemData = await axios.get(`http://localhost:8800/api/getproductdetails/${order.myItem}`);
            return {
              ...order,
              desiredItemDetails: desiredItemData.data,
              myItemDetails: myItemData.data,
            };
          })
        );

        setOrders(updatedOrders);
      } catch (error) {
        console.error('Error fetching user data:', error.message);
      }
    };
    // console.log(orders);
    const fetchuserData = async () => {
      try {
        const userData = await axios.get(`http://localhost:8800/api/users/${userId}`);
        const user = userData.data;
        setUser(user);
      } catch (error) {
        console.error('Error fetching user data:', error.message);
      }
    }
    fetchUser();
    fetchuserData();
  }, []);

  // console.log(orders);
  return (
    <>
      <Navbar />

      <h1 className="OrderHistoryHeading">Your Barters</h1>

      <section className="orderHistory">
        {orders?.map((order) => (

          <div className="OrderHistoryCard">

            <div className="orderNavBar">
              <div className="OrderNavBarContent">
                <div className="OrderNavBarContentInner">
                  <h4>Order Number</h4>
                  <p>#{order._id}</p>
                </div>
                <div className="OrderNavBarContentInner">
                  <h4>Date</h4>
                  <p>{order.createdAt}</p>
                </div>
                <div className="OrderNavBarContentInner">
                  <h4>Swapped For</h4>
                  <p>{order.desiredItemDetails.prodname}</p>
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
                  <span><strong>Seller:</strong>{order.desiredItemDetails.sellerName}</span>

                  <span><strong>Buyer:</strong>{user.name}</span>

                </div>
              </div>

            </div>
          </div>
        ))}
      </section>

      <Footer />
    </>
  );
};

export default Orders;
