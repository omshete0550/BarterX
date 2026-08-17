import { useMemo, useState } from "react";
import { Heart, Search, SlidersHorizontal, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

import Navbar from "../../component/layout/Navbar";
import Footer from "../../component/layout/Footer";

import ProductCard from "../../component/product/ProductCard";

import wishlistProductsData from "../../data/wishlist";

import "./Wishlist.css";

function Wishlist() {
  const navigate = useNavigate();

  const [products, setProducts] = useState(wishlistProductsData);

  const [search, setSearch] = useState("");

  const [category, setCategory] = useState("All");

  const [showFilters, setShowFilters] = useState(false);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState(null);

  /*
   * Categories
   */
  const categories = [
    "All",
    ...new Set(products.map((product) => product.category)),
  ];

  /*
   * Filter products
   */
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch =
        product.title.toLowerCase().includes(search.toLowerCase()) ||
        product.category.toLowerCase().includes(search.toLowerCase());

      const matchesCategory =
        category === "All" || product.category === category;

      return matchesSearch && matchesCategory;
    });
  }, [products, search, category]);

  /*
   * Remove wishlist item
   */
  const removeFromWishlist = (id) => {
    setProducts((current) => current.filter((product) => product.id !== id));
  };

  /*
   * Clear search
   */
  const clearSearch = () => {
    setSearch("");
  };

  /*
   * Loading state
   */
  if (loading) {
    return (
      <div className="wishlist-page">
        <Navbar />

        <main className="wishlist-main">
          <div className="wishlist-container">
            <div className="wishlist-heading">
              <div>
                <span>YOUR COLLECTION</span>

                <h1>Wishlist</h1>
              </div>
            </div>

            <div className="wishlist-loading">
              <div className="wishlist-spinner" />

              <p>Loading your wishlist...</p>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    );
  }

  /*
   * Error state
   */
  if (error) {
    return (
      <div className="wishlist-page">
        <Navbar />

        <main className="wishlist-main">
          <div className="wishlist-container">
            <div className="wishlist-heading">
              <div>
                <span>YOUR COLLECTION</span>

                <h1>Wishlist</h1>
              </div>
            </div>

            <div className="wishlist-error">
              <div className="wishlist-error-icon">!</div>

              <h2>Something went wrong</h2>

              <p>We couldn't load your wishlist.</p>

              <button onClick={() => setError(null)}>Try Again</button>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    );
  }

  return (
    <div className="wishlist-page">
      <Navbar />

      <main className="wishlist-main">
        <div className="wishlist-container">
          {/* ================================= */}
          {/* Header */}
          {/* ================================= */}

          <div className="wishlist-heading">
            <div>
              <span>YOUR COLLECTION</span>

              <h1>Wishlist</h1>
            </div>

            <p>Save products you would like to swap later.</p>
          </div>

          {/* ================================= */}
          {/* Wishlist Summary */}
          {/* ================================= */}

          <div className="wishlist-summary">
            <div className="wishlist-summary-icon">
              <Heart size={19} fill="currentColor" />
            </div>

            <div>
              <strong>
                {products.length}{" "}
                {products.length === 1 ? "product" : "products"} saved
              </strong>

              <span>Find something you love and make a swap.</span>
            </div>
          </div>

          {/* ================================= */}
          {/* Controls */}
          {/* ================================= */}

          {products.length > 0 && (
            <div className="wishlist-controls">
              {/* Search */}

              <div className="wishlist-search">
                <Search size={16} />

                <input
                  type="text"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search your wishlist..."
                />

                {search && (
                  <button type="button" onClick={clearSearch}>
                    <X size={14} />
                  </button>
                )}
              </div>

              {/* Filter Button */}

              <button
                type="button"
                className="wishlist-filter-button"
                onClick={() => setShowFilters(!showFilters)}
              >
                <SlidersHorizontal size={15} />
                Filters
              </button>
            </div>
          )}

          {/* ================================= */}
          {/* Category Filters */}
          {/* ================================= */}

          {products.length > 0 && showFilters && (
            <div className="wishlist-filters">
              <span>CATEGORY</span>

              <div className="wishlist-category-list">
                {categories.map((item) => (
                  <button
                    key={item}
                    type="button"
                    className={category === item ? "active" : ""}
                    onClick={() => setCategory(item)}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* ================================= */}
          {/* Empty Wishlist */}
          {/* ================================= */}

          {products.length === 0 && (
            <div className="wishlist-empty">
              <div className="wishlist-empty-icon">
                <Heart size={30} />
              </div>

              <span>NOTHING SAVED YET</span>

              <h2>Your wishlist is empty</h2>

              <p>Browse products and save the ones you'd like to swap later.</p>

              <button type="button" onClick={() => navigate("/products")}>
                Browse Products
              </button>
            </div>
          )}

          {/* ================================= */}
          {/* No Search Results */}
          {/* ================================= */}

          {products.length > 0 && filteredProducts.length === 0 && (
            <div className="wishlist-no-results">
              <Search size={28} />

              <h2>No products found</h2>

              <p>Try changing your search or category filter.</p>

              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  setCategory("All");
                }}
              >
                Clear Filters
              </button>
            </div>
          )}

          {/* ================================= */}
          {/* Product Grid */}
          {/* ================================= */}

          {filteredProducts.length > 0 && (
            <div className="wishlist-grid">
              {filteredProducts.map((product) => (
                <div className="wishlist-card-wrapper" key={product.id}>
                  <ProductCard product={product} />

                  {/* Wishlist Remove */}

                  <button
                    type="button"
                    className="wishlist-remove"
                    title="Remove from wishlist"
                    onClick={() => removeFromWishlist(product.id)}
                  >
                    <Heart size={16} fill="currentColor" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Wishlist;
