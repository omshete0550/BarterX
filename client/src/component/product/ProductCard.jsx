import { Heart, MapPin, ArrowLeftRight, UserRound } from "lucide-react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Button from "../common/Button";
import { addToWishlist, removeFromWishlist } from "../../features/wishlist/wishlistSlice";

import "../../styles/product/product-card.css";

function ProductCard({ product }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => Boolean(state.auth.user));
  const liked = useSelector((state) => state.wishlist.items.some((item) => item.id === product.id));

  const handleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isLoggedIn) {
      navigate("/login");
      return;
    }
    dispatch(liked ? removeFromWishlist(product.id) : addToWishlist(product));
  };

  const handleCardClick = () => {
    navigate(`/products/${product.id}`);
  };

  return (
    <Link to={`/products/${product.id}`} className="product-card-link">
      <article className="product-card" onClick={handleCardClick}>
        {/* Image */}

        <div className="product-card-image-wrapper">
          <img
            src={product.image || "https://placehold.co/800x600/f0ebff/6d3df5?text=BarterX"}
            alt={product.title}
            className="product-card-image"
          />

          <span className="product-condition">{product.condition}</span>

          <button
            className={`product-wishlist ${liked ? "liked" : ""}`}
            onClick={handleWishlist}
            aria-label="Add to wishlist"
          >
            <Heart size={18} fill={liked ? "currentColor" : "none"} />
          </button>
        </div>

        {/* Content */}

        <div className="product-card-content">
          <span className="product-category">{product.category}</span>

          <h3 className="product-title">{product.title}</h3>

          <div className="product-location">
            <MapPin size={14} />
            <span>{product.location}</span>
          </div>

          {/* Desired Product */}

          <div className="product-wants">
            <div className="product-wants-icon">
              <ArrowLeftRight size={15} />
            </div>

            <div>
              <span>Wants in exchange</span>
              <strong>{product.desiredProduct}</strong>
            </div>
          </div>

          {/* Seller */}

          <div className="product-seller">
            <div className="seller-info">
              {product.owner?.avatar ? (
                <img src={product.owner.avatar} alt={product.owner.name} />
              ) : (
                <div className="seller-placeholder">
                  <UserRound size={14} />
                </div>
              )}

              <span>{product.owner?.name || "BarterX User"}</span>
            </div>
          </div>

          {/* Action */}

          <div className="product-card-action">
            <Button
              fullWidth
              size="small"
              icon={<ArrowLeftRight size={15} />}
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/products/${product.id}`);
              }}
            >
              Swap Now
            </Button>
          </div>
        </div>
      </article>
    </Link>
  );
}

export default ProductCard;
