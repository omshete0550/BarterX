import { useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeftRight,
  CheckCircle2,
  MapPin,
  MessageCircle,
  Package,
  ShieldCheck,
} from "lucide-react";

import Navbar from "../../component/layout/Navbar";
import Footer from "../../component/layout/Footer";
import Button from "../../component/common/Button";

import products from "../../data/product";

import "./SwapRequest.css";

function SwapRequest() {
  const { id } = useParams();
  const navigate = useNavigate();

  const requestedProduct = products.find(
    (product) => String(product.id) === String(id),
  );

  const [selectedProductId, setSelectedProductId] = useState("");

  const [message, setMessage] = useState(
    "Hi, I would like to exchange my product with yours. Let me know if you're interested!",
  );

  const [submitted, setSubmitted] = useState(false);

  /*
   * In the future this will come from
   * the authenticated user's products
   */
  const myProducts = useMemo(() => {
    return products.filter(
      (product) => product.owner?.id !== requestedProduct?.owner?.id,
    );
  }, [requestedProduct]);

  const selectedProduct = products.find(
    (product) => String(product.id) === String(selectedProductId),
  );

  /*
   * Product doesn't exist
   */
  if (!requestedProduct) {
    return (
      <div className="swap-page">
        <Navbar />

        <main className="swap-not-found">
          <div className="swap-not-found-icon">!</div>

          <h1>Product not found</h1>

          <p>We couldn't find the product you're trying to swap.</p>

          <Link to="/products">
            <Button>Browse Products</Button>
          </Link>
        </main>

        <Footer />
      </div>
    );
  }

  /*
   * Send request
   */
  const handleSubmit = (event) => {
    event.preventDefault();

    if (!selectedProductId) {
      return;
    }

    setSubmitted(true);
  };

  /*
   * Success state
   */
  if (submitted) {
    return (
      <div className="swap-page">
        <Navbar />

        <main className="swap-success-page">
          <div className="swap-success-card">
            <div className="swap-success-icon">
              <CheckCircle2 size={34} />
            </div>

            <span className="swap-success-label">Request Sent</span>

            <h1>Your swap request is on its way!</h1>

            <p>
              {requestedProduct.owner?.name || "The seller"} will be notified
              about your request. You can continue the conversation once they
              respond.
            </p>

            <div className="swap-success-exchange">
              <div>
                <img
                  src={selectedProduct?.image}
                  alt={selectedProduct?.title}
                />

                <span>{selectedProduct?.title}</span>
              </div>

              <ArrowLeftRight size={20} />

              <div>
                <img
                  src={requestedProduct.image}
                  alt={requestedProduct.title}
                />

                <span>{requestedProduct.title}</span>
              </div>
            </div>

            <div className="swap-success-actions">
              <Button
                onClick={() => navigate("/messages")}
                icon={<MessageCircle size={16} />}
              >
                Go to Messages
              </Button>

              <Button variant="outline" onClick={() => navigate("/products")}>
                Continue Browsing
              </Button>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    );
  }

  return (
    <div className="swap-page">
      <Navbar />

      <main>
        {/* ================================= */}
        {/* Header */}
        {/* ================================= */}

        <section className="swap-header">
          <div className="swap-container">
            <Link to={`/products/${requestedProduct.id}`} className="swap-back">
              ← Back to product
            </Link>

            <span className="swap-eyebrow">Marketplace</span>

            <h1>Request a Swap</h1>

            <p>Choose one of your products and send an exchange request.</p>
          </div>
        </section>

        {/* ================================= */}
        {/* Main */}
        {/* ================================= */}

        <section className="swap-content">
          <div className="swap-container">
            <form className="swap-layout" onSubmit={handleSubmit}>
              {/* ================================= */}
              {/* Left */}
              {/* ================================= */}

              <div className="swap-main">
                {/* Target Product */}

                <div className="swap-section-card">
                  <div className="swap-section-heading">
                    <div className="swap-step">01</div>

                    <div>
                      <h2>Product you want</h2>

                      <p>You're requesting this item from the seller.</p>
                    </div>
                  </div>

                  <div className="target-product">
                    <img
                      src={requestedProduct.image}
                      alt={requestedProduct.title}
                    />

                    <div className="target-product-info">
                      <span>{requestedProduct.category}</span>

                      <h3>{requestedProduct.title}</h3>

                      <div className="target-meta">
                        <span>
                          <MapPin size={13} />

                          {requestedProduct.location}
                        </span>

                        <span>{requestedProduct.condition}</span>
                      </div>

                      <div className="target-owner">
                        <img
                          src={requestedProduct.owner?.avatar}
                          alt={requestedProduct.owner?.name}
                        />

                        <span>
                          Listed by{" "}
                          <strong>{requestedProduct.owner?.name}</strong>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Select Product */}

                <div className="swap-section-card">
                  <div className="swap-section-heading">
                    <div className="swap-step">02</div>

                    <div>
                      <h2>Choose your product</h2>

                      <p>Select something you'd like to offer in exchange.</p>
                    </div>
                  </div>

                  <div className="your-products">
                    {myProducts.map((product) => (
                      <button
                        type="button"
                        key={product.id}
                        className={`your-product ${
                          String(selectedProductId) === String(product.id)
                            ? "selected"
                            : ""
                        }`}
                        onClick={() => setSelectedProductId(product.id)}
                      >
                        <div className="your-product-image">
                          <img src={product.image} alt={product.title} />

                          <div className="product-check">
                            <CheckCircle2 size={16} />
                          </div>
                        </div>

                        <div className="your-product-info">
                          <strong>{product.title}</strong>

                          <span>{product.category}</span>

                          <small>Wants: {product.desiredProduct}</small>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Message */}

                <div className="swap-section-card">
                  <div className="swap-section-heading">
                    <div className="swap-step">03</div>

                    <div>
                      <h2>Add a message</h2>

                      <p>Introduce yourself and explain your offer.</p>
                    </div>
                  </div>

                  <div className="swap-message">
                    <textarea
                      value={message}
                      onChange={(event) => setMessage(event.target.value)}
                      maxLength={500}
                      placeholder="Write a message to the seller..."
                    />

                    <span>
                      {message.length}
                      /500
                    </span>
                  </div>
                </div>
              </div>

              {/* ================================= */}
              {/* Right Summary */}
              {/* ================================= */}

              <aside className="swap-sidebar">
                <div className="swap-summary">
                  <div className="swap-summary-heading">
                    <ArrowLeftRight size={18} />

                    <h2>Swap Summary</h2>
                  </div>

                  {/* Their Product */}

                  <div className="summary-product">
                    <span>You receive</span>

                    <div>
                      <img
                        src={requestedProduct.image}
                        alt={requestedProduct.title}
                      />

                      <strong>{requestedProduct.title}</strong>
                    </div>
                  </div>

                  <div className="summary-arrow">
                    <ArrowLeftRight size={18} />
                  </div>

                  {/* Your Product */}

                  <div className="summary-product">
                    <span>You offer</span>

                    {selectedProduct ? (
                      <div>
                        <img
                          src={selectedProduct.image}
                          alt={selectedProduct.title}
                        />

                        <strong>{selectedProduct.title}</strong>
                      </div>
                    ) : (
                      <div className="summary-empty">
                        <Package size={18} />

                        <span>Select a product</span>
                      </div>
                    )}
                  </div>

                  <div className="summary-divider" />

                  <div className="summary-detail">
                    <span>Seller</span>

                    <strong>{requestedProduct.owner?.name}</strong>
                  </div>

                  <div className="summary-detail">
                    <span>Location</span>

                    <strong>{requestedProduct.location}</strong>
                  </div>

                  <Button
                    type="submit"
                    fullWidth
                    disabled={!selectedProductId}
                    icon={<ArrowLeftRight size={16} />}
                  >
                    Send Swap Request
                  </Button>

                  {!selectedProductId && (
                    <p className="select-warning">
                      Select one of your products first.
                    </p>
                  )}
                </div>

                {/* Safety */}

                <div className="swap-safety">
                  <ShieldCheck size={19} />

                  <div>
                    <strong>Trade safely</strong>

                    <p>Keep communication and exchanges within BarterX.</p>
                  </div>
                </div>
              </aside>
            </form>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default SwapRequest;
