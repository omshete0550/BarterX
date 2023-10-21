import React, { useState, useEffect } from "react";
import "./ProductDetails.css";
import axios from "axios";
import { useLocation } from "react-router-dom";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import Review from "../../Components/Review/Review";
import Table from "../../Components/Table/Table";

import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

const ProductDetails = () => {
  const location = useLocation();
  const { id } = location.state;
  const [userName, setUserName] = useState('');
  const [product, setProduct] = useState([]);
  const [myproduct, setMyProduct] = useState([]);
  // setProduct(props.id);
  useEffect(() => {
    // Fetch products from the backend API using Axios
    axios
      .get(`http://localhost:8800/api/getproductdetails/${id}`)
      .then((response) => {
        setProduct(response.data);
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, []);


  const [imgId, setImgId] = useState(1);

  const handleImageClick = (event, id) => {
    event.preventDefault();
    setImgId(id);
  };

  useEffect(() => {
    const getUserName = async () => {
      try {
        const userId = product.postedBy;
        const userData = await axios.get(`http://localhost:8800/api/users/${userId}`);
        const userName = userData.data.name;
        setUserName(userName);
      } catch (error) {
        console.error('Error fetching user data:', error.message);
      }
    }
    getUserName();
  }, [product])

  // useEffect(() => {
  //   const displayWidth = document.querySelector(
  //     ".img-showcase img:first-child"
  //   ).clientWidth;
  //   document.querySelector(".img-showcase").style.transform = `translateX(${-(imgId - 1) * displayWidth
  //     }px)`;
  // }, [imgId]);

  const imgBtns = product.images

  const [responseMessage, setResponseMessage] = useState('');
  const sendProposal = async (item) => {
    const userId = localStorage.getItem("token");
    const barterRequest = {
      requester: userId, // Replace with actual user ID
      desiredItem: id, // Replace with actual desired item's IDs
      myItem: item._id, // Assuming item._id is the ID of the item the user wants to barter
    };
    try {
      const response = await axios.post('http://localhost:8800/api/products/barter', barterRequest);

      if (response.status === 201) {
        // Handle a successful response from the server, e.g., show a success message.
        setResponseMessage('Barter proposal sent successfully!');
      } else {
        // Handle errors, e.g., show an error message.
        setResponseMessage('Error sending barter proposal');
      }
    } catch (error) {
      // Handle any network or other errors
      setResponseMessage('Error sending barter proposal');
    }
  }

  return (
    <>
      <Navbar />

      <section className="productDetailContainer">
        <div className="ProductcardWrapper">
          <div className="DetailProductcard">
            <div className="product-imgs">
              <div className="img-display">
                <div className="img-showcase">
                  {imgBtns ? imgBtns.map((imgItem, id) => (
                    <img key={id} src={imgItem.url} alt="alt" />
                  )) : "Loading..."}
                </div>
              </div>
              <div className="img-select">
                {imgBtns ? imgBtns.map((imgItem) => (
                  <div className="img-item" key={id}>
                    <a
                      href="#"
                      data-id={id}
                      onClick={(event) => handleImageClick(event, id)}
                    >
                      <img src={imgItem.url} alt="alt" />
                    </a>
                  </div>
                )) : "Loading..."}
              </div>
            </div>

            <div className="product-content">
              <h2 className="product-title">{product.prodname}</h2>
              <div className="product-rating">
                Proposers: <span>(21)</span>
              </div>

              <div className="product-detail">
                <h2>about this item: </h2>
                <p>{product.desc}</p>

                <ul>
                  <li>
                    Owner: <span>{userName ? userName : "loading.."}</span>
                  </li>
                  <li>
                    Required: <span>{product.desprodname}</span>
                  </li>
                  <li>
                    Date Of Purchase: <span>{product.datepurchase}</span>
                  </li>
                </ul>
              </div>

              <div className="purchase-info">
                {/* <a onClick={handleSwap}>Swap kar</a> */}
                <Popup
                  trigger={<a className="btn swapbtn" > Let's Swap </a>}
                  modal
                  nested
                >
                  {(close) => (
                    <div className="modal">
                      <button className="close" onClick={close}>
                        &times;
                      </button>
                      <div className="content">
                        <div className="contentheader">
                          <h2>Your Barter Items</h2>
                        </div>
                        <div className="contentGrid">
                          {myproduct.map((item) => (
                            <div className="CategCardContainer">
                              <div className="Categcard">
                                <div className="content-1">
                                  <div className="logo-img">
                                    <img src={item.src} alt="" />
                                  </div>
                                  <img src="" alt="" />
                                </div>
                                <div className="content-2">
                                  <div className="branding">
                                    <div className="brandingInner">
                                      <span>{item.prodname}</span>
                                      {/* <span>Old</span> */}
                                    </div>
                                    {/* <h4>Owner: {owner}</h4> */}
                                    {/* <h4>Required: {desiredProduct}</h4> */}
                                    <h4>Date: {item.datepurchase}</h4>
                                  </div>
                                  <div className="likesContainer">
                                    <div className="price">
                                      <a onClick={() => { sendProposal(item) }}>
                                        <span>
                                          {/* <Link
                                        to="/product-detail"
                                        style={{ color: "#fff" }}
                                      >
                                        Let's Swap
                                      </Link> */}
                                          Send Proposal
                                        </span></a>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>))}
                        </div>
                      </div>

                      <div className="actions">
                        <button
                          className="btn"
                          onClick={() => {
                            close();
                          }}
                        >
                          CLOSE
                        </button>
                      </div>
                    </div>
                  )}
                </Popup>

                <button type="button" className="btn">
                  Let's Chat
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="DataTable">
        <Table id={id} />
      </div>

      <Review product={id} />

      <Footer />
    </>
  );
};

export default ProductDetails;
