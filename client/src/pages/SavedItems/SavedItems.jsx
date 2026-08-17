import { useMemo, useState } from "react";
import {
  Heart,
  Search,
  Trash2,
  ArrowLeftRight,
  MapPin,
  ChevronDown,
  PackageOpen,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import Navbar from "../../component/layout/Navbar";
import Footer from "../../component/layout/Footer";
import Modal from "../../component/common/Modal";

import productsData from "../../data/product";

import "./SavedItems.css";

function SavedItems() {
  const navigate = useNavigate();

  /*
   * Temporary mock saved products.
   *
   * Later this will come from:
   *
   * GET /api/users/me/wishlist
   */

  const [savedProducts, setSavedProducts] = useState(productsData.slice(0, 6));

  const [search, setSearch] = useState("");

  const [category, setCategory] = useState("All");

  const [sortBy, setSortBy] = useState("recent");

  const [removeProduct, setRemoveProduct] = useState(null);

  const [loading] = useState(false);

  const [error] = useState(null);

  /*
   * Categories
   */

  const categories = [
    "All",
    ...new Set(savedProducts.map((product) => product.category)),
  ];

  /*
   * Filter + Search + Sort
   */

  const filteredProducts = useMemo(() => {
    let result = savedProducts.filter((product) => {
      const matchesSearch =
        product.title.toLowerCase().includes(search.toLowerCase()) ||
        product.desiredProduct.toLowerCase().includes(search.toLowerCase());

      const matchesCategory =
        category === "All" || product.category === category;

      return matchesSearch && matchesCategory;
    });

    if (sortBy === "name") {
      result.sort((a, b) => a.title.localeCompare(b.title));
    }

    if (sortBy === "category") {
      result.sort((a, b) => a.category.localeCompare(b.category));
    }

    return result;
  }, [savedProducts, search, category, sortBy]);

  /*
   * Remove saved product
   */

  const handleRemove = () => {
    if (!removeProduct) return;

    setSavedProducts((current) =>
      current.filter((product) => product.id !== removeProduct.id),
    );

    setRemoveProduct(null);
  };

  /*
   * Clear all saved items
   */

  const handleClearAll = () => {
    setSavedProducts([]);
  };

  /*
   * Loading
   */

  if (loading) {
    return (
      <div className="saved-items-page">
        <Navbar />

        <main className="saved-items-main">
          <div className="saved-items-container">
            <div className="saved-items-loading">
              <div className="saved-items-spinner" />

              <p>Loading saved items...</p>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    );
  }

  /*
   * Error
   */

  if (error) {
    return (
      <div className="saved-items-page">
        <Navbar />

        <main className="saved-items-main">
          <div className="saved-items-container">
            <div className="saved-items-error">
              <div className="saved-items-error-icon">!</div>

              <h2>Couldn't load saved items</h2>

              <p>Something went wrong while loading your saved products.</p>

              <button onClick={() => window.location.reload()}>
                Try Again
              </button>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    );
  }

  return (
    <div className="saved-items-page">
      <Navbar />

      <main className="saved-items-main">
        <div className="saved-items-container">
          {/* ================================= */}
          {/* Header */}
          {/* ================================= */}

          <section className="saved-items-header">
            <div>
              <span className="saved-items-eyebrow">YOUR COLLECTION</span>

              <h1>Saved Items</h1>

              <p>Keep track of products you're interested in swapping.</p>
            </div>

            <div className="saved-items-count">
              <Heart size={15} />

              <strong>{savedProducts.length}</strong>

              <span>saved</span>
            </div>
          </section>

          {/* ================================= */}
          {/* Toolbar */}
          {/* ================================= */}

          {savedProducts.length > 0 && (
            <section className="saved-items-toolbar">
              <div className="saved-items-search">
                <Search size={15} />

                <input
                  type="text"
                  placeholder="Search saved items..."
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                />
              </div>

              <div className="saved-items-filters">
                <select
                  value={category}
                  onChange={(event) => setCategory(event.target.value)}
                >
                  {categories.map((item) => (
                    <option key={item} value={item}>
                      {item === "All" ? "All Categories" : item}
                    </option>
                  ))}
                </select>

                <select
                  value={sortBy}
                  onChange={(event) => setSortBy(event.target.value)}
                >
                  <option value="recent">Recently Saved</option>

                  <option value="name">Name</option>

                  <option value="category">Category</option>
                </select>
              </div>
            </section>
          )}

          {/* ================================= */}
          {/* Results Bar */}
          {/* ================================= */}

          {savedProducts.length > 0 && (
            <div className="saved-items-results">
              <span>
                Showing <strong>{filteredProducts.length}</strong> saved{" "}
                {filteredProducts.length === 1 ? "item" : "items"}
              </span>

              {savedProducts.length > 0 && (
                <button onClick={() => setRemoveProduct("all")}>
                  Clear All
                </button>
              )}
            </div>
          )}

          {/* ================================= */}
          {/* Product Grid */}
          {/* ================================= */}

          {filteredProducts.length > 0 ? (
            <section className="saved-items-grid">
              {filteredProducts.map((product) => (
                <article className="saved-product-card" key={product.id}>
                  {/* Image */}

                  <div className="saved-product-image-wrapper">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="saved-product-image"
                    />

                    <span className="saved-product-condition">
                      {product.condition}
                    </span>

                    <button
                      className="saved-product-remove"
                      title="Remove from saved"
                      onClick={() => setRemoveProduct(product)}
                    >
                      <Heart size={14} fill="currentColor" />
                    </button>
                  </div>

                  {/* Content */}

                  <div className="saved-product-content">
                    <div className="saved-product-category">
                      {product.category}
                    </div>

                    <h2>{product.title}</h2>

                    <div className="saved-product-location">
                      <MapPin size={11} />

                      {product.location}
                    </div>

                    {/* Owner */}

                    <div className="saved-product-owner">
                      <img
                        src={product.owner?.avatar}
                        alt={product.owner?.name}
                      />

                      <span>{product.owner?.name}</span>
                    </div>

                    {/* Desired Product */}

                    <div className="saved-product-desired">
                      <span>Looking for</span>

                      <strong>{product.desiredProduct}</strong>
                    </div>

                    {/* Actions */}

                    <div className="saved-product-actions">
                      <button
                        className="saved-product-swap"
                        onClick={() => navigate(`/swap-request/${product.id}`)}
                      >
                        <ArrowLeftRight size={12} />
                        Swap Now
                      </button>

                      <button
                        className="saved-product-view"
                        onClick={() => navigate(`/products/${product.id}`)}
                      >
                        View
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </section>
          ) : (
            /* ================================= */
            /* Empty State */
            /* ================================= */

            <section className="saved-items-empty">
              <div className="saved-items-empty-icon">
                {search || category !== "All" ? (
                  <Search size={27} />
                ) : (
                  <PackageOpen size={27} />
                )}
              </div>

              <h2>
                {search || category !== "All"
                  ? "No saved items found"
                  : "Your saved items are empty"}
              </h2>

              <p>
                {search || category !== "All"
                  ? "Try changing your search or category filter."
                  : "Save products you're interested in so you can easily come back and request a swap later."}
              </p>

              {search || category !== "All" ? (
                <button
                  onClick={() => {
                    setSearch("");

                    setCategory("All");
                  }}
                >
                  Clear Filters
                </button>
              ) : (
                <button onClick={() => navigate("/products")}>
                  Browse Products
                </button>
              )}
            </section>
          )}
        </div>
      </main>

      <Footer />

      {/* ================================= */}
      {/* Remove Modal */}
      {/* ================================= */}

      {removeProduct && (
        <Modal onClose={() => setRemoveProduct(null)}>
          <div className="saved-remove-modal">
            <div className="saved-remove-icon">
              {removeProduct === "all" ? (
                <Trash2 size={19} />
              ) : (
                <Heart size={19} />
              )}
            </div>

            <h2>
              {removeProduct === "all"
                ? "Clear Saved Items?"
                : "Remove Saved Item?"}
            </h2>

            <p>
              {removeProduct === "all"
                ? "Are you sure you want to remove all saved products?"
                : `Remove "${removeProduct.title}" from your saved items?`}
            </p>

            <div className="saved-remove-actions">
              <button
                className="saved-remove-cancel"
                onClick={() => setRemoveProduct(null)}
              >
                Cancel
              </button>

              <button
                className="saved-remove-confirm"
                onClick={() => {
                  if (removeProduct === "all") {
                    handleClearAll();
                    setRemoveProduct(null);
                  } else {
                    handleRemove();
                  }
                }}
              >
                {removeProduct === "all" ? "Clear All" : "Remove"}
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

export default SavedItems;
