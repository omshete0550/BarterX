import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  Heart,
  MapPin,
  ArrowLeftRight,
  ShieldCheck,
  MessageCircle,
  ChevronLeft,
  ChevronRight,
  Share2,
  Clock3,
} from "lucide-react";

import Navbar from "../../component/layout/Navbar";
import Footer from "../../component/layout/Footer";
import Button from "../../component/common/Button";
import ProductGrid from "../../component/product/ProductGrid";

import products from "../../data/product";

import "./ProductDetail.css";

function ProductDetail() {
  const navigate = useNavigate();
  const { id } = useParams();

  const product = products.find((item) => String(item.id) === String(id));

  const [activeImage, setActiveImage] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);

  if (!product) {
    return (
      <div className="product-detail-page">
        <Navbar />

        <main className="product-not-found">
          <div className="not-found-icon">!</div>

          <h1>Product not found</h1>

          <p>This product may have been removed or is no longer available.</p>

          <Link to="/products">
            <Button>Browse Products</Button>
          </Link>
        </main>

        <Footer />
      </div>
    );
  }

  /*
   * Product images.
   *
   * If your product only has one image,
   * the same image is used as a fallback.
   */
  const images =
    product.images?.length > 0
      ? product.images
      : [product.image, product.image, product.image];

  const nextImage = () => {
    setActiveImage((current) =>
      current === images.length - 1 ? 0 : current + 1,
    );
  };

  const previousImage = () => {
    setActiveImage((current) =>
      current === 0 ? images.length - 1 : current - 1,
    );
  };

  return (
    <div className="product-detail-page">
      <Navbar />

      <main>
        {/* ================================= */}
        {/* Breadcrumb */}
        {/* ================================= */}

        <div className="product-detail-top">
          <div className="product-detail-container">
            <div className="product-detail-breadcrumb">
              <Link to="/">Home</Link>

              <span>/</span>

              <Link to="/products">Products</Link>

              <span>/</span>

              <span>{product.title}</span>
            </div>
          </div>
        </div>

        {/* ================================= */}
        {/* Main Product */}
        {/* ================================= */}

        <section className="product-detail-section">
          <div className="product-detail-container">
            <div className="product-detail-layout">
              {/* ================================= */}
              {/* Product Gallery */}
              {/* ================================= */}

              <div className="product-gallery">
                <div className="product-main-image">
                  <img src={images[activeImage]} alt={product.title} />

                  <button
                    className="gallery-arrow gallery-prev"
                    onClick={previousImage}
                    aria-label="Previous image"
                  >
                    <ChevronLeft size={20} />
                  </button>

                  <button
                    className="gallery-arrow gallery-next"
                    onClick={nextImage}
                    aria-label="Next image"
                  >
                    <ChevronRight size={20} />
                  </button>

                  <div className="gallery-counter">
                    {activeImage + 1} / {images.length}
                  </div>
                </div>

                <div className="product-thumbnails">
                  {images.map((image, index) => (
                    <button
                      key={index}
                      className={`product-thumbnail ${
                        activeImage === index ? "active" : ""
                      }`}
                      onClick={() => setActiveImage(index)}
                    >
                      <img src={image} alt={`${product.title} ${index + 1}`} />
                    </button>
                  ))}
                </div>
              </div>

              {/* ================================= */}
              {/* Product Information */}
              {/* ================================= */}

              <div className="product-information">
                <div className="product-category-badge">{product.category}</div>

                <div className="product-title-row">
                  <h1>{product.title}</h1>

                  <div className="product-action-buttons">
                    <button
                      className={`product-icon-button ${
                        isWishlisted ? "wishlisted" : ""
                      }`}
                      onClick={() => setIsWishlisted(!isWishlisted)}
                      aria-label="Wishlist"
                    >
                      <Heart
                        size={19}
                        fill={isWishlisted ? "currentColor" : "none"}
                      />
                    </button>

                    <button className="product-icon-button" aria-label="Share">
                      <Share2 size={18} />
                    </button>
                  </div>
                </div>

                {/* Meta */}

                <div className="product-meta">
                  <span>
                    <MapPin size={15} />

                    {product.location}
                  </span>

                  <span>
                    <Clock3 size={15} />
                    Recently listed
                  </span>
                </div>

                {/* Condition */}

                <div className="product-condition">
                  <span className="condition-label">Condition</span>

                  <span className="condition-value">{product.condition}</span>
                </div>

                {/* Description */}

                <div className="product-description">
                  <h3>Description</h3>

                  <p>
                    {product.description ||
                      `This ${product.title.toLowerCase()} is in good condition and ready for a new owner. The seller is interested in exchanging this product for something useful and valuable.`}
                  </p>
                </div>

                {/* Desired Product */}

                <div className="desired-product">
                  <div className="desired-product-icon">
                    <ArrowLeftRight size={18} />
                  </div>

                  <div>
                    <span>Seller wants</span>

                    <strong>{product.desiredProduct}</strong>
                  </div>
                </div>

                {/* Actions */}

                <div className="product-primary-actions">
                  <Button
                    fullWidth
                    icon={<ArrowLeftRight size={17} />}
                    onClick={() => navigate(`/swap/${product.id}`)}
                  >
                    Swap Now
                  </Button>

                  <Button
                    variant="outline"
                    fullWidth
                    icon={<MessageCircle size={17} />}
                  >
                    Message Seller
                  </Button>
                </div>

                {/* Trust */}

                <div className="product-trust">
                  <ShieldCheck size={18} />

                  <div>
                    <strong>Trade safely with BarterX</strong>

                    <span>
                      Never share sensitive information outside the platform.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================================= */}
        {/* Seller Section */}
        {/* ================================= */}

        <section className="seller-section">
          <div className="product-detail-container">
            <div className="seller-card">
              <div className="seller-info">
                <div className="seller-avatar">
                  {product.seller?.avatar ? (
                    <img
                      src={product.seller.avatar}
                      alt={product.seller.name}
                    />
                  ) : (
                    product.seller?.name?.charAt(0)?.toUpperCase() || "U"
                  )}
                </div>

                <div>
                  <span>Listed by</span>

                  <h3>{product.seller?.name || "BarterX User"}</h3>

                  <p>Active on BarterX</p>
                </div>
              </div>

              <Link to={`/profile/${product.seller?.id || ""}`}>
                <Button variant="outline">View Profile</Button>
              </Link>
            </div>
          </div>
        </section>

        {/* ================================= */}
        {/* Related Products */}
        {/* ================================= */}

        <section className="related-products">
          <div className="product-detail-container">
            <div className="related-header">
              <div>
                <span>Discover more</span>

                <h2>Similar Products</h2>
              </div>

              <Link to="/products">View all</Link>
            </div>

            <ProductGrid
              products={products
                .filter(
                  (item) =>
                    item.id !== product.id &&
                    item.category === product.category,
                )
                .slice(0, 4)}
            />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default ProductDetail;
