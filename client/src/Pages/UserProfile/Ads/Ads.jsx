import React,{useState, useEffect} from "react";
import { useLocation } from "react-router-dom";  
import axios from "axios";
import Navbar from "../../../Components/Navbar/Navbar";
import Footer from "../../../Components/Footer/Footer";
import "../Orders/Orders.css";

const Ads = () => {

  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const [products, setProducts] = useState([])
  useEffect(() => {
  const myProducts = async () => {
    try {
      const userId = localStorage.getItem("token");
      const response = await axios.get(
        `http://localhost:8800/api/myproducts/${userId}`
      );
      setProducts(response.data);
      // console.log(products);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };
  myProducts();
},[])
  return (
    <>
      <Navbar />

      <h1 className="OrderHistoryHeading">Your Ads</h1>

      <div className="CategCardContainer myitems" >
                          {products.length > 0 ? (
                          products.map((item, index) => (
                            <div className="Categcard" key={index} style={{"height":"22em", "width":"15em"}}>
                              <div className="content-1">
                                <div className="logo-img">
                                  {/* <img src="https://i.postimg.cc/vBJtjtRC/nike-logo.png" alt="" /> */}
                                </div>
                                <img src={item.images[0].url} alt="" style={{"width": "100%", "alignItems":"center", "justifyContent":"center","height":"110%"}}/>
                              </div>
                              <div className="content-2">
                                <div className="branding">
                                  <div className="brandingInner" style={{"paddingTop":"5px"}}>
                                    <span>{item.prodname}</span>
                                    <span>{}</span>
                                  </div>
                                  <h4></h4>
                                  <h4>Category: {item.categ}</h4>
                                  <h4>Desired: {item.desprodname}</h4>
                                  <h4>Condition: {item.condn}</h4>
                                </div>
                                <div className="likesContainer">
                                  <div className="price">
                                  {/* <button onClick={() => sendProposal(item)} style={{"background":"transparent"}}> */}
                                  {/* <span>
                                      Send Proposal
                                  </span>
                                  </button> */}
                                    
                                  </div>
                                </div>
                       
                              </div>
                            </div>))) : (<img src="https://i.pinimg.com/originals/c7/e1/b7/c7e1b7b5753737039e1bdbda578132b8.gif" height={250}/>)}
                          </div>

      <Footer />
    </>
  );
};

export default Ads;
