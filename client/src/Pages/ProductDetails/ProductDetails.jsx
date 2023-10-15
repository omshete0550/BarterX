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
  // const location = useLocation();
  // console.log(location.state.id);
  // const { state } = useLocation();
  // console.log(state);
  const location = useLocation();
  const { id } = location.state;

  const [product, setProduct] = useState([]);
  // setProduct(props.id);
  useEffect(() => {
    // Fetch products from the backend API using Axios
    axios
      .get(`http://localhost:8800/api/getproductdetails/${id}`)
      .then((response) => {
        setProduct(response.data);
        console.log(response.data); // Log the array of products to the console
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  const [imgId, setImgId] = useState(1);

  const handleImageClick = (event, id) => {
    event.preventDefault();
    setImgId(id);
  };

  useEffect(() => {
    const displayWidth = document.querySelector(
      ".img-showcase img:first-child"
    ).clientWidth;
    document.querySelector(".img-showcase").style.transform = `translateX(${
      -(imgId - 1) * displayWidth
    }px)`;
  }, [imgId]);

  const ProdcutDetailArr = [
    {
      id: 1,
      pname: "Sofa",
      pdesc:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo eveniet veniam tempora fuga tenetur placeat sapiente architecto illum soluta consequuntur, aspernatur quidem at sequi ipsa! Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur, perferendis eius. Dignissimos, labore suscipit. Unde.",
      powner: "Ram Shinde",
      requiredment: "Office Chair",
      dateOfPurchase: "12/10/2022",
    },
  ];

  const imgBtns = [
    {
      id: 1,
      src: "https://images.unsplash.com/photo-1540574163026-643ea20ade25?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c29mYXxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80",
      alt: "shoe image",
    },
  ];
  // const productdetails = product.map((pItem) => (
  //   <div className="product-content" key={pItem._id}>
  //     <h2 className="product-title">{pItem.prodname}</h2>
  //     <div className="product-rating">
  //       Proposers: <span>(21)</span>
  //     </div>

  //     <div className="product-detail">
  //       <h2>about this item: </h2>
  //       <p>
  //         {pItem.desc}
  //       </p>

  //       <ul>
  //         <li>
  //           Owner: <span>{pItem.postedBy}</span>
  //         </li>
  //         <li>
  //           Required: <span>{pItem.desprodname}</span>
  //         </li>
  //         <li>
  //           Date Of Purchase: <span>{pItem.datepurchase}</span>
  //         </li>
  //       </ul>
  //     </div>

  //     <div className="purchase-info">
  //       <button type="button" className="btn">
  //         Let's Swap
  //       </button>
  //       <button type="button" className="btn">
  //         Let's Chat
  //       </button>
  //     </div>

  //   </div>
  // ));

  const myItems = [
    {
      id: 1,
      src: "https://images.unsplash.com/photo-1540574163026-643ea20ade25?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c29mYXxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80",
      productname: "Product One",
      date: "23-08-2023"
    },
    {
      id: 2,
      src: "https://images.unsplash.com/photo-1540574163026-643ea20ade25?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c29mYXxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80",
      productname: "Product Two",
      date: "02-03-2023"
    },
    {
      id: 3,
      src: "https://images.unsplash.com/photo-1540574163026-643ea20ade25?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c29mYXxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80",
      productname: "Product Three",
      date: "30-10-2023"
    },
    {
      id: 4,
      src: "https://images.unsplash.com/photo-1540574163026-643ea20ade25?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c29mYXxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80",
      productname: "Product Three",
      date: "30-10-2023"
    },
    {
      id: 5,
      src: "https://images.unsplash.com/photo-1540574163026-643ea20ade25?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c29mYXxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80",
      productname: "Product Three",
      date: "30-10-2023"
    },
    {
      id: 6,
      src: "https://images.unsplash.com/photo-1540574163026-643ea20ade25?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c29mYXxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80",
      productname: "Product Three",
      date: "30-10-2023"
    },
  ];

  return (
    <>
      <Navbar />

      <section className="productDetailContainer">
        <div className="ProductcardWrapper">
          <div className="DetailProductcard">
            <div className="product-imgs">
              <div className="img-display">
                <div className="img-showcase">
                  {imgBtns.map((imgItem) => (
                    <img key={imgItem.id} src={imgItem.src} alt={imgItem.alt} />
                  ))}
                </div>
              </div>
              <div className="img-select">
                {imgBtns.map((imgItem) => (
                  <div className="img-item" key={imgItem.id}>
                    <a
                      href="#"
                      data-id={imgItem.id}
                      onClick={(event) => handleImageClick(event, imgItem.id)}
                    >
                      <img src={imgItem.src} alt={imgItem.alt} />
                    </a>
                  </div>
                ))}
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
                    Owner: <span>{product.postedBy}</span>
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
              
                <Popup
                  trigger={<button className="btn"> Let's Swap </button>}
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
                        {myItems.map((item) => (
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
                                    <span>{item.productname}</span>
                                    {/* <span>Old</span> */}
                                  </div>
                                  {/* <h4>Owner: {owner}</h4> */}
                                  {/* <h4>Required: {desiredProduct}</h4> */}
                                  <h4>Date: {item.date}</h4>
                                </div>
                                <div className="likesContainer">
                                  <div className="price">
                                    <span>
                                      {/* <Link
                                        to="/product-detail"
                                        style={{ color: "#fff" }}
                                      >
                                        Let's Swap
                                      </Link> */}
                                      Send Proposal
                                    </span>
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
                            console.log("modal closed ");
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
        <Table />
      </div>

      <Review />

      <Footer />
    </>
  );
};

export default ProductDetails;
