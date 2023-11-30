import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./ProductDetails.css";
import axios from "axios";
import { useLocation } from "react-router-dom";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import Review from "../../Components/Review/Review";
import Table from "../../Components/Table/Table";
import Products from "../Category/Products/Products";
import { BsCart, BsHandThumbsUp, BsHeart } from "react-icons/bs";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

const ProductDetails = () => {
  const location = useLocation();
  const { id } = location.state;

  const [product, setProduct] = useState([]);
  const [myproduct, setMyProduct] = useState([]);
  const [username, setUsername] = useState("");
  const [seller, setSellerName] = useState("");
  const [sellerid, setSellerNameId] = useState("");
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch products from the backend API using Axios
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8800/api/getproductdetails/${id}`
        );
        setProduct(response.data);
        console.log(response.data); // Log the array of products to the console
        console.log(response.data.postedBy);
        setSellerName(response.data.sellerName);
        setSellerNameId(response.data.postedBy);

      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchData();
    // fetchUserData();
  }, []);

  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const [imgId, setImgId] = useState(1);

  const handleImageClick = (event, id) => {
    event.preventDefault();
    setImgId(id);
  };

  const imgBtns = product.images;

  const [responseMessage, setResponseMessage] = useState("");
  const sendProposal = async (item) => {
    const userId = localStorage.getItem("token");
    const barterRequest = {
      requester: userId, // Replace with actual user ID
      desiredItem: id, // Replace with actual desired item's IDs
      myItem: item._id, // Assuming item._id is the ID of the item the user wants to barter
    };
    try {
      const response = await axios.post(
        "http://localhost:8800/api/products/barter",
        barterRequest
      );

      if (response.status === 201) {
        // Handle a successful response from the server, e.g., show a success message.
        setResponseMessage("Barter proposal sent successfully!");
        setPopupVisible(false);
      } else {
        // Handle errors, e.g., show an error message.
        setResponseMessage("Error sending barter proposal");
      }
    } catch (error) {
      // Handle any network or other errors
      setResponseMessage("Error sending barter proposal");
    }
  };

  const [isPopupVisible, setPopupVisible] = useState(false);

  const swap = async () => {
    try {
      const userId = localStorage.getItem("token");
      const response = await axios.get(
        `http://localhost:8800/api/myproducts/${userId}`
      );
      setProducts(response.data);
      console.log(products);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const openPopup = () => {
    setPopupVisible(true);
    swap();
  };

  const closePopup = () => {
    setPopupVisible(false);
  };

  // const [proposalData, setProposalData] = useState({
  //   desiredItem: '', // You need to set the desired product ID
  //   myItem: '', // You need to set the user's product ID
  // });

  // const handleProposalChange = (e) => {
  //   const { name, value } = e.target;
  //   setProposalData({
  //     ...proposalData,
  //     [name]: value,
  //   });
  // };

  // const handleSendProposal = (id) => {
  //   myitem = id;
  //   desiredItem = 
  //   axios
  //     .post('http://localhost:8800/api/products/barter', proposalData)
  //     .then((response) => {
  //       // Handle success, e.g., inform the user that the proposal was sent
  //     })
  //     .catch((error) => {
  //       // Handle errors, e.g., display an error message to the user
  //     });
  // };

  return (
    <>
      <Navbar />

      <section className="productDetailContainer">
        <div className="ProductcardWrapper">
          <div className="DetailProductcard">
            <div className="product-imgs">
              <div className="img-display">
                <div className="img-showcase">
                  {product.images && product.images.length > 0 ? (
                    <img src={product.images[0].url} alt="Alt text" />
                  ) : (
                    <img
                      src="https://i.pinimg.com/originals/c7/e1/b7/c7e1b7b5753737039e1bdbda578132b8.gif"
                      width={500}
                    />
                  )}
                </div>
              </div>
              <div className="img-select">
                {imgBtns
                  ? imgBtns.map((imgItem) => (
                      <div className="img-item" key={id}>
                        <a
                          href="#"
                          data-id={id}
                          onClick={(event) => handleImageClick(event, id)}
                        >
                          <img
                            src={imgItem.src}
                            alt={imgItem.alt}
                            className="gif"
                          />
                        </a>
                      </div>
                    ))
                  : "Loading..."}
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
                    Owner: <span>{seller}</span>
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
          

                <button
                  type="button"
                  className="swapbtn btn"
                  onClick={openPopup}
                >
                  Let's Swap
                </button>
                {isPopupVisible && (
                  <div className="popup-overlay">
                    <div className="popup">
                      <div className="popup-content" style={{"display": "flex","flexDirection":"column","justifyContent":"center", "alignItems": "center"}}>
                        <h2 style={{"padding":"10px"}}>YOUR READY - TO - BARTER ITEMS</h2>
                        <div className="gridItems">
                          {/* <Products result={products} /> */}
                          <div className="CategCardContainer myitems" >
                          {products.length > 0 ? (
                          products.map((item, index) => (
                            <div className="Categcard" key={index} style={{"height":"22em", "width":"15em"}}>
                              <div className="content-1">
                                <div className="logo-img">
                                  {/* <img src="https://i.postimg.cc/vBJtjtRC/nike-logo.png" alt="" /> */}
                                </div>
                                <img src={item.images[0].url} alt="" style={{"width": "5em", "alignItems":"center", "justifyContent":"center", "left":"35%"}}/>
                              </div>
                              <div className="content-2">
                                <div className="branding">
                                  <div className="brandingInner">
                                    <span>{item.prodname}</span>
                                    <span>{}</span>
                                  </div>
                                  <h4></h4>
                                  <h4>Category: {item.categ}</h4>
                                </div>
                                <div className="likesContainer">
                                  <div className="price">
                                  <button onClick={() => sendProposal(item)} style={{"background":"transparent"}}>
                                  <span>
                                      Send Proposal
                                  </span>
                                  </button>
                                    
                                  </div>
                                </div>
                       
                              </div>
                            </div>))) : (<img src="https://i.pinimg.com/originals/c7/e1/b7/c7e1b7b5753737039e1bdbda578132b8.gif" height={250}/>)}
                          </div>
                        </div>
                        <button onClick={closePopup}>Close</button>
                      </div>
                    </div>
                  </div>
                )}

                <Link to={`/chat/${sellerid}`}>
                  <button type="button" className="btn">
                    Let's Chat
                  </button>
                </Link>
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
