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
 

  // const handleSwap = async () => {
  //   const userId = localStorage.getItem("token"); // Replace with the actual user ID or get it dynamically.
  //   console.log(userId);
  //   try {
  //     // Make an Axios GET request to your API endpoint to fetch the products.
      
  //     const response = await axios.get(`http://localhost:8800/api/myproducts/${userId}`);
  
  //     // Assuming the API returns an array of products, you can access the data from the response.
  //     const products = response.data;
  
  //     // Do something with the products data, e.g., log it to the console.
  //     console.log(products);
  //   } catch (error) {
  //     // Handle any errors, e.g., display an error message.
  //     console.error('Error fetching products:', error);
  //   }
  // }




  const location = useLocation();
  const { id } = location.state;

  const [product, setProduct] = useState([]);
  const [myproduct, setMyProduct] = useState([]);
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
  // const btn = document.querySelector('.swapbtn');
  // btn.addEventListener('click', async () => {
  //   const userId = localStorage.getItem("token"); // Replace with the actual user ID or get it dynamically.
  //   console.log(userId);
  //   try {
  //     // Make an Axios GET request to your API endpoint to fetch the products.
      
  //     const response = await axios.get(`http://localhost:8800/api/myproducts/${userId}`);
  
  //     // Assuming the API returns an array of products, you can access the data from the response.
  //     setMyProduct(response.data);
  
  //     // Do something with the products data, e.g., log it to the console.
  //     console.log(myproduct);
  //   } catch (error) {
  //     // Handle any errors, e.g., display an error message.
  //     console.error('Error fetching products:', error);
  //   }
  // })
  const [responseMessage, setResponseMessage] = useState('');
  const sendProposal = async (item) => {
    const userId = localStorage.getItem("token"); // Replace with the actual user ID or get it dynamically.
    // console.log(userId);
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
                                  <a onClick={() => {sendProposal(item)}}>
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
        <Table id={id}/>
      </div>

      <Review />

      <Footer />
    </>
  );
};

export default ProductDetails;
