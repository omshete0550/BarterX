import { useState } from "react";
import Navigation from "./Navigation/Nav";
import Products from "./Products/Products";
import products from "./db/data";
import Recommended from "./Recommended/Recommended";
import Sidebar from "./Sidebar/Sidebar";
import Card from "../../Components/Category/Card";
import { useWindowSize } from "react-use";
import { Link } from "react-router-dom";
import { FaRegHeart, FaShoppingCart } from "react-icons/fa";
import { AiOutlineUserAdd } from "react-icons/ai";
import logo from "../../assets/logo.png";
import Input from "../../Components/Category/Input";
import Footer from "../../Components/Footer/Footer";

function Category() {
  const [selectedCategory, setSelectedCategory] = useState(null);

  // ----------- Input Filter -----------
  const [query, setQuery] = useState("");

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const filteredItems = products.filter(
    (product) => product.title.toLowerCase().indexOf(query.toLowerCase()) !== -1
  );

  // ----------- Radio Filtering -----------
  const handleChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  // ------------ Button Filtering -----------
  const handleClick = (event) => {
    setSelectedCategory(event.target.value);
  };

  function filteredData(products, selected, query) {
    let filteredProducts = products;

    // Filtering Input Items
    if (query) {
      filteredProducts = filteredItems;
    }

    // Applying selected filter
    if (selected) {
      filteredProducts = filteredProducts.filter(
        ({ category, color, company, newPrice, title }) =>
          category === selected ||
          color === selected ||
          company === selected ||
          newPrice === selected ||
          title === selected
      );
    }

    return filteredProducts.map(
      ({
        img,
        title,
        star,
        reviews,
        prevPrice,
        newPrice,
        owner,
        desiredProduct,
      }) => (
        <Card
          key={Math.random()}
          img={img}
          title={title}
          desiredProduct={desiredProduct}
          owner={owner}
          star={star}
          reviews={reviews}
          prevPrice={prevPrice}
          newPrice={newPrice}
        />
      )
    );
  }

  const result = filteredData(products, selectedCategory, query);
  const { width: windowWidth } = useWindowSize();

  return (
    <>
      {windowWidth > 1023 ? (
        <>
          <Sidebar handleChange={handleChange} />
          <Navigation query={query} handleInputChange={handleInputChange} />
          <Recommended handleClick={handleClick} />
          <Products result={result} />
        </>
      ) : (
        <>
          <section>
            <nav className="categNavMob">
              <div className="logo">
                <img src={logo} alt="" />
              </div>
              <div className="nav-container">
                <input
                  className="search-input"
                  type="text"
                  onChange={handleInputChange}
                  value={query}
                  placeholder="Enter your search shoes."
                />
              </div>
              <div className="profile-container">
                <Link to="/">
                  <i>
                    <FaRegHeart />
                  </i>
                </Link>
                <Link to="">
                  <i>
                    <AiOutlineUserAdd />
                  </i>
                  {/* <AccountMenu /> */}
                </Link>
              </div>
            </nav>
          </section>

          <section className="CategSec2">
            <h1>Filters</h1>
            <div className="filterCategContainer">
              <div className="categDiv">
                <h2>Catgeory</h2>
                <div className="ml">
                  <label className="sidebar-label-container">
                    <input
                      onChange={handleChange}
                      type="radio"
                      value=""
                      name="test"
                    />
                    <span className="checkmark"></span>All
                  </label>
                  <Input
                    handleChange={handleChange}
                    value="sneakers"
                    title="Sneakers"
                    name="test"
                  />
                  <Input
                    handleChange={handleChange}
                    value="flats"
                    title="Flats"
                    name="test"
                  />
                  <Input
                    handleChange={handleChange}
                    value="sandals"
                    title="Sandals"
                    name="test"
                  />
                  <Input
                    handleChange={handleChange}
                    value="heels"
                    title="Heels"
                    name="test"
                  />
                  <Input
                    handleChange={handleChange}
                    value="T-shirt"
                    title="T-shirt"
                    name="test"
                  />
                </div>
              </div>
              
              <div className="categDiv">
                <h2>Catgeory</h2>
                <div className="ml">
                  <label className="sidebar-label-container">
                    <input
                      onChange={handleChange}
                      type="radio"
                      value=""
                      name="test"
                    />
                    <span className="checkmark"></span>All
                  </label>
                  <Input
                    handleChange={handleChange}
                    value="sneakers"
                    title="Sneakers"
                    name="test"
                  />
                  <Input
                    handleChange={handleChange}
                    value="flats"
                    title="Flats"
                    name="test"
                  />
                  <Input
                    handleChange={handleChange}
                    value="sandals"
                    title="Sandals"
                    name="test"
                  />
                  <Input
                    handleChange={handleChange}
                    value="heels"
                    title="Heels"
                    name="test"
                  />
                  <Input
                    handleChange={handleChange}
                    value="T-shirt"
                    title="T-shirt"
                    name="test"
                  />
                </div>
              </div>
              <div className="categDiv">
                <h2>Catgeory</h2>
                <div className="ml">
                  <label className="sidebar-label-container">
                    <input
                      onChange={handleChange}
                      type="radio"
                      value=""
                      name="test"
                    />
                    <span className="checkmark"></span>All
                  </label>
                  <Input
                    handleChange={handleChange}
                    value="sneakers"
                    title="Sneakers"
                    name="test"
                  />
                  <Input
                    handleChange={handleChange}
                    value="flats"
                    title="Flats"
                    name="test"
                  />
                  <Input
                    handleChange={handleChange}
                    value="sandals"
                    title="Sandals"
                    name="test"
                  />
                  <Input
                    handleChange={handleChange}
                    value="heels"
                    title="Heels"
                    name="test"
                  />
                  <Input
                    handleChange={handleChange}
                    value="T-shirt"
                    title="T-shirt"
                    name="test"
                  />
                </div>
              </div>
            </div>
          </section>

          <Products result={result} />
          <Footer />
        </>
      )}
    </>
  );
}

export default Category;
