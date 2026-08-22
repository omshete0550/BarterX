import { useState } from "react";
import {
  MapPin,
  CalendarDays,
  CheckCircle,
  Package,
  ArrowLeftRight,
  Heart,
  Edit3,
  MoreHorizontal,
  MessageCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import Navbar from "../../component/layout/Navbar";
import Footer from "../../component/layout/Footer";
import ProductCard from "../../component/product/ProductCard";

import profileData from "../../data/profile";

import "./Profile.css";

function Profile() {
  const navigate = useNavigate();

  const [profile] = useState(profileData);

  const [loading] = useState(false);

  const [error] = useState(null);

  const [activeTab, setActiveTab] = useState("products");

  /*
   * Loading State
   */
  if (loading) {
    return (
      <div className="profile-page">
        <Navbar />

        <main className="profile-main">
          <div className="profile-container">
            <div className="profile-loading">
              <div className="profile-spinner" />

              <p>Loading profile...</p>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    );
  }

  /*
   * Error State
   */
  if (error) {
    return (
      <div className="profile-page">
        <Navbar />

        <main className="profile-main">
          <div className="profile-container">
            <div className="profile-error">
              <div className="profile-error-icon">!</div>

              <h2>Unable to load profile</h2>

              <p>Something went wrong while loading this profile.</p>

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
    <div className="profile-page">
      <Navbar />

      <main className="profile-main">
        <div className="profile-container">
          {/* ================================= */}
          {/* Profile Header */}
          {/* ================================= */}

          <section className="profile-header">
            <div className="profile-cover" />

            <div className="profile-header-content">
              <div className="profile-avatar-wrapper">
                <img
                  src={profile.avatar}
                  alt={profile.name}
                  className="profile-avatar"
                />

                {profile.isVerified && (
                  <div className="profile-verified">
                    <CheckCircle size={17} fill="currentColor" />
                  </div>
                )}
              </div>

              <div className="profile-main-info">
                <div className="profile-name-row">
                  <div>
                    <h1>{profile.name}</h1>

                    <span>{profile.username}</span>
                  </div>

                  <button
                    className="profile-edit-button"
                    onClick={() => navigate("/profile/edit")}
                  >
                    <Edit3 size={14} />
                    Edit Profile
                  </button>
                </div>

                <p className="profile-bio">{profile.bio}</p>

                <div className="profile-meta">
                  <span>
                    <MapPin size={13} />

                    {profile.location}
                  </span>

                  <span>
                    <CalendarDays size={13} />
                    Joined {profile.memberSince}
                  </span>
                </div>
              </div>
            </div>
          </section>

          {/* ================================= */}
          {/* Statistics */}
          {/* ================================= */}

          <section className="profile-stats">
            <div className="profile-stat">
              <div className="profile-stat-icon">
                <Package size={17} />
              </div>

              <div>
                <strong>{profile.stats.products}</strong>

                <span>Products</span>
              </div>
            </div>

            <div className="profile-stat">
              <div className="profile-stat-icon">
                <ArrowLeftRight size={17} />
              </div>

              <div>
                <strong>{profile.stats.swaps}</strong>

                <span>Swaps</span>
              </div>
            </div>

            <div className="profile-stat">
              <div className="profile-stat-icon">
                <Heart size={17} />
              </div>

              <div>
                <strong>{profile.stats.wishlist}</strong>

                <span>Wishlist</span>
              </div>
            </div>
          </section>

          {/* ================================= */}
          {/* Tabs */}
          {/* ================================= */}

          <div className="profile-tabs">
            <button
              className={activeTab === "products" ? "active" : ""}
              onClick={() => setActiveTab("products")}
            >
              My Products
            </button>

            <button
              className={activeTab === "wishlist" ? "active" : ""}
              onClick={() => setActiveTab("wishlist")}
            >
              Wishlist
            </button>

            <button
              className={activeTab === "activity" ? "active" : ""}
              onClick={() => setActiveTab("activity")}
            >
              Swap Activity
            </button>
          </div>

          {/* ================================= */}
          {/* My Products */}
          {/* ================================= */}

          {activeTab === "products" && (
            <section className="profile-section">
              <div className="profile-section-header">
                <div>
                  <span>AVAILABLE</span>

                  <h2>My Products</h2>
                </div>

                <button onClick={() => navigate("/add-product")}>
                  + Add Product
                </button>
              </div>

              {profile.products.length > 0 ? (
                <div className="profile-product-grid">
                  {profile.products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="profile-empty">
                  <Package size={28} />

                  <h3>No products listed</h3>

                  <p>Add your first product and start swapping.</p>

                  <button onClick={() => navigate("/add-product")}>
                    Add Product
                  </button>
                </div>
              )}
            </section>
          )}

          {/* ================================= */}
          {/* Wishlist */}
          {/* ================================= */}

          {activeTab === "wishlist" && (
            <section className="profile-section">
              <div className="profile-section-header">
                <div>
                  <span>SAVED ITEMS</span>

                  <h2>Wishlist</h2>
                </div>

                <button onClick={() => navigate("/wishlist")}>View All</button>
              </div>

              {profile.wishlist.length > 0 ? (
                <div className="profile-product-grid">
                  {profile.wishlist.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="profile-empty">
                  <Heart size={28} />

                  <h3>Wishlist is empty</h3>

                  <p>Save products you'd like to swap later.</p>
                </div>
              )}
            </section>
          )}

          {/* ================================= */}
          {/* Swap Activity */}
          {/* ================================= */}

          {activeTab === "activity" && (
            <section className="profile-section">
              <div className="profile-section-header">
                <div>
                  <span>HISTORY</span>

                  <h2>Swap Activity</h2>
                </div>

                <button onClick={() => navigate("/swap-requests")}>
                  View Requests
                </button>
              </div>

              <div className="swap-activity">
                {profile.swapActivity.length > 0 ? (
                  profile.swapActivity.map((activity) => (
                    <div className="swap-item" key={activity.id}>
                      <div className="swap-product-icon">
                        <ArrowLeftRight size={16} />
                      </div>

                      <div className="swap-item-info">
                        <strong>{activity.product}</strong>

                        <span>Swap with {activity.user}</span>

                        <small>{activity.date}</small>
                      </div>

                      <div className="swap-item-right">
                        <span
                          className={`swap-status ${activity.status.toLowerCase()}`}
                        >
                          {activity.status}
                        </span>

                        <button
                          title="Open conversation"
                          onClick={() => navigate("/messages")}
                        >
                          <MessageCircle size={15} />
                        </button>

                        <button title="More">
                          <MoreHorizontal size={15} />
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="profile-empty">
                    <ArrowLeftRight size={28} />

                    <h3>No swap activity</h3>

                    <p>Your swap history will appear here.</p>
                  </div>
                )}
              </div>
            </section>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Profile;
