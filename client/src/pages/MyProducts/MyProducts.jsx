import { useMemo, useState } from "react";
import {
  Plus,
  Search,
  Package,
  ArrowLeftRight,
  Eye,
  Edit3,
  Trash2,
  MoreVertical,
  MapPin,
  Heart,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import Navbar from "../../component/layout/Navbar";
import Footer from "../../component/layout/Footer";
import Modal from "../../component/common/Modal";

import productsData from "../../data/product";

import "./MyProducts.css";

function MyProducts() {
  const navigate = useNavigate();

  /*
   * In the real application this will come
   * from the logged-in user's API.
   */
  const [products, setProducts] = useState(productsData);

  const [search, setSearch] = useState("");

  const [category, setCategory] = useState("All");

  const [condition, setCondition] = useState("All");

  const [activeMenu, setActiveMenu] = useState(null);

  const [deleteProduct, setDeleteProduct] = useState(null);

  const [loading] = useState(false);

  const [error] = useState(null);

  /*
   * Categories
   */
  const categories = [
    "All",
    ...new Set(products.map((product) => product.category)),
  ];

  /*
   * Conditions
   */
  const conditions = [
    "All",
    ...new Set(products.map((product) => product.condition)),
  ];

  /*
   * Filter products
   */
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch =
        product.title.toLowerCase().includes(search.toLowerCase()) ||
        product.desiredProduct.toLowerCase().includes(search.toLowerCase());

      const matchesCategory =
        category === "All" || product.category === category;

      const matchesCondition =
        condition === "All" || product.condition === condition;

      return matchesSearch && matchesCategory && matchesCondition;
    });
  }, [products, search, category, condition]);

  /*
   * Delete product
   */
  const handleDelete = () => {
    if (!deleteProduct) return;

    setProducts((current) =>
      current.filter((product) => product.id !== deleteProduct.id),
    );

    setDeleteProduct(null);
  };

  /*
   * Loading state
   */
  if (loading) {
    return (
      <div className="my-products-page">
        <Navbar />

        <main className="my-products-main">
          <div className="my-products-container">
            <div className="my-products-loading">
              <div className="my-products-spinner" />

              <p>Loading your products...</p>
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
      <div className="my-products-page">
        <Navbar />

        <main className="my-products-main">
          <div className="my-products-container">
            <div className="my-products-error">
              <div className="my-products-error-icon">!</div>

              <h2>Couldn't load products</h2>

              <p>Something went wrong while loading your products.</p>

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
    <div className="my-products-page" onClick={() => setActiveMenu(null)}>
      <Navbar />

      <main className="my-products-main">
        <div className="my-products-container">
          {/* ================================= */}
          {/* Header */}
          {/* ================================= */}

          <section className="my-products-header">
            <div>
              <span className="my-products-eyebrow">SELL & SWAP</span>

              <h1>My Products</h1>

              <p>Manage the products you've listed on BarterX.</p>
            </div>

            <button
              className="my-products-add-button"
              onClick={() => navigate("/add-product")}
            >
              <Plus size={15} />
              Add Product
            </button>
          </section>

          {/* ================================= */}
          {/* Stats */}
          {/* ================================= */}

          <section className="my-products-stats">
            <div className="my-products-stat">
              <div className="my-products-stat-icon">
                <Package size={17} />
              </div>

              <div>
                <span>TOTAL PRODUCTS</span>

                <strong>{products.length}</strong>
              </div>
            </div>

            <div className="my-products-stat">
              <div className="my-products-stat-icon">
                <ArrowLeftRight size={17} />
              </div>

              <div>
                <span>SWAP REQUESTS</span>

                <strong>12</strong>
              </div>
            </div>

            <div className="my-products-stat">
              <div className="my-products-stat-icon">
                <Eye size={17} />
              </div>

              <div>
                <span>TOTAL VIEWS</span>

                <strong>248</strong>
              </div>
            </div>

            <div className="my-products-stat">
              <div className="my-products-stat-icon">
                <Heart size={17} />
              </div>

              <div>
                <span>SAVED</span>

                <strong>36</strong>
              </div>
            </div>
          </section>

          {/* ================================= */}
          {/* Toolbar */}
          {/* ================================= */}

          <section className="my-products-toolbar">
            <div className="my-products-search">
              <Search size={15} />

              <input
                type="text"
                placeholder="Search your products..."
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />
            </div>

            <div className="my-products-filters">
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
                value={condition}
                onChange={(event) => setCondition(event.target.value)}
              >
                {conditions.map((item) => (
                  <option key={item} value={item}>
                    {item === "All" ? "All Conditions" : item}
                  </option>
                ))}
              </select>
            </div>
          </section>

          {/* ================================= */}
          {/* Results Header */}
          {/* ================================= */}

          <div className="my-products-results-header">
            <div>
              <strong>{filteredProducts.length}</strong>

              <span> products found</span>
            </div>

            {(search || category !== "All" || condition !== "All") && (
              <button
                onClick={() => {
                  setSearch("");
                  setCategory("All");
                  setCondition("All");
                }}
              >
                Clear filters
              </button>
            )}
          </div>

          {/* ================================= */}
          {/* Product Grid */}
          {/* ================================= */}

          {filteredProducts.length > 0 ? (
            <section className="my-products-grid">
              {filteredProducts.map((product) => (
                <article className="my-product-card" key={product.id}>
                  {/* Image */}

                  <div className="my-product-image-wrapper">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="my-product-image"
                    />

                    <span className="my-product-condition">
                      {product.condition}
                    </span>

                    <button
                      className="my-product-menu-button"
                      onClick={(event) => {
                        event.stopPropagation();

                        setActiveMenu(
                          activeMenu === product.id ? null : product.id,
                        );
                      }}
                    >
                      <MoreVertical size={16} />
                    </button>

                    {activeMenu === product.id && (
                      <div
                        className="my-product-menu"
                        onClick={(event) => event.stopPropagation()}
                      >
                        <button
                          onClick={() => navigate(`/products/${product.id}`)}
                        >
                          <Eye size={13} />
                          View
                        </button>

                        <button
                          onClick={() =>
                            navigate(`/products/edit/${product.id}`)
                          }
                        >
                          <Edit3 size={13} />
                          Edit
                        </button>

                        <button
                          className="danger"
                          onClick={() => {
                            setDeleteProduct(product);

                            setActiveMenu(null);
                          }}
                        >
                          <Trash2 size={13} />
                          Delete
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Content */}

                  <div className="my-product-content">
                    <div className="my-product-category">
                      {product.category}
                    </div>

                    <h2>{product.title}</h2>

                    <div className="my-product-location">
                      <MapPin size={11} />

                      {product.location}
                    </div>

                    <div className="my-product-desired">
                      <span>Looking for</span>

                      <strong>{product.desiredProduct}</strong>
                    </div>

                    <div className="my-product-actions">
                      <button
                        className="my-product-edit"
                        onClick={() => navigate(`/products/edit/${product.id}`)}
                      >
                        <Edit3 size={12} />
                        Edit
                      </button>

                      <button
                        className="my-product-view"
                        onClick={() => navigate(`/products/${product.id}`)}
                      >
                        <Eye size={12} />
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

            <section className="my-products-empty">
              <div className="my-products-empty-icon">
                <Package size={28} />
              </div>

              <h2>No products found</h2>

              <p>
                {search || category !== "All" || condition !== "All"
                  ? "Try changing your search or filters."
                  : "You haven't listed any products yet. Add something you'd like to swap."}
              </p>

              {search || category !== "All" || condition !== "All" ? (
                <button
                  onClick={() => {
                    setSearch("");

                    setCategory("All");

                    setCondition("All");
                  }}
                >
                  Clear Filters
                </button>
              ) : (
                <button onClick={() => navigate("/add-product")}>
                  <Plus size={14} />
                  Add Product
                </button>
              )}
            </section>
          )}
        </div>
      </main>

      <Footer />

      {/* ================================= */}
      {/* Delete Confirmation Modal */}
      {/* ================================= */}

      {deleteProduct && (
        <Modal onClose={() => setDeleteProduct(null)}>
          <div className="delete-product-modal">
            <div className="delete-product-icon">
              <Trash2 size={20} />
            </div>

            <h2>Delete Product?</h2>

            <p>
              Are you sure you want to delete{" "}
              <strong>{deleteProduct.title}</strong>? This action cannot be
              undone.
            </p>

            <div className="delete-product-actions">
              <button
                className="delete-cancel"
                onClick={() => setDeleteProduct(null)}
              >
                Cancel
              </button>

              <button className="delete-confirm" onClick={handleDelete}>
                Delete Product
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

export default MyProducts;
