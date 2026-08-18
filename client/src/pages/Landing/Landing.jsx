import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Laptop,
  Repeat2,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Users,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import Navbar from "../../component/layout/Navbar";
import Footer from "../../component/layout/Footer";

import "./Landing.css";

function Landing() {
  const navigate = useNavigate();

  const categories = [
    {
      title: "Electronics",
      count: "120+ items",
      icon: Laptop,
    },
    {
      title: "Mobiles",
      count: "80+ items",
      icon: Smartphone,
    },
    {
      title: "Furniture",
      count: "65+ items",
      icon: Sparkles,
    },
    {
      title: "Sports",
      count: "45+ items",
      icon: Repeat2,
    },
  ];

  const steps = [
    {
      number: "01",
      title: "List your product",
      description:
        "Add your product, upload photos, and tell the community what you'd like in return.",
    },
    {
      number: "02",
      title: "Discover something",
      description:
        "Browse products from people around you and find something you'd love to have.",
    },
    {
      number: "03",
      title: "Make the swap",
      description:
        "Send a swap request, discuss the details, and exchange your products.",
    },
  ];

  return (
    <div className="landing-page">
      <Navbar />

      <main>
        {/* ========================================= */}
        {/* HERO */}
        {/* ========================================= */}

        <section className="landing-hero">
          <div className="landing-container landing-hero-container">
            <div className="landing-hero-content">
              <span className="landing-eyebrow">THE SMARTER WAY TO TRADE</span>

              <h1>
                Exchange what you have.
                <span>Get what you want.</span>
              </h1>

              <p>
                BarterX makes it simple to discover products, connect with
                people, and swap items without spending money.
              </p>

              <div className="landing-hero-actions">
                <button
                  className="landing-primary-btn"
                  onClick={() => navigate("/products")}
                >
                  Explore Products
                  <ArrowRight size={14} />
                </button>

                <button
                  className="landing-secondary-btn"
                  onClick={() => navigate("/add-product")}
                >
                  List Your Product
                </button>
              </div>

              <div className="landing-trust-row">
                <div className="landing-trust-item">
                  <div>
                    <Check size={11} />
                  </div>

                  <span>Free to swap</span>
                </div>

                <div className="landing-trust-item">
                  <div>
                    <Check size={11} />
                  </div>

                  <span>Local community</span>
                </div>

                <div className="landing-trust-item">
                  <div>
                    <Check size={11} />
                  </div>

                  <span>Easy & secure</span>
                </div>
              </div>
            </div>

            {/* Hero Visual */}

            <div className="landing-hero-visual">
              <div className="landing-orbit landing-orbit-one" />
              <div className="landing-orbit landing-orbit-two" />

              <div className="landing-product-card landing-product-card-main">
                <div className="landing-product-image">
                  <img
                    src="https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=900"
                    alt="Laptop"
                  />
                </div>

                <div className="landing-product-info">
                  <div>
                    <span>ELECTRONICS</span>

                    <h3>MacBook Air</h3>
                  </div>

                  <div className="landing-swap-icon">
                    <Repeat2 size={14} />
                  </div>
                </div>

                <div className="landing-wanted">
                  <small>Looking for</small>

                  <strong>iPad or Tablet</strong>
                </div>
              </div>

              <div className="landing-floating-card landing-floating-user">
                <div className="landing-avatar-stack">
                  <img src="https://i.pravatar.cc/100?img=12" alt="" />

                  <img src="https://i.pravatar.cc/100?img=32" alt="" />

                  <img src="https://i.pravatar.cc/100?img=47" alt="" />
                </div>

                <div>
                  <strong>2,500+</strong>

                  <span>Active traders</span>
                </div>
              </div>

              <div className="landing-floating-card landing-floating-swap">
                <div className="landing-floating-icon">
                  <Repeat2 size={14} />
                </div>

                <div>
                  <strong>Swap matched</strong>

                  <span>Just now</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================= */}
        {/* STATS */}
        {/* ========================================= */}

        <section className="landing-stats">
          <div className="landing-container landing-stats-grid">
            <div>
              <strong>2.5K+</strong>
              <span>Active users</span>
            </div>

            <div>
              <strong>5K+</strong>
              <span>Products listed</span>
            </div>

            <div>
              <strong>1.8K+</strong>
              <span>Successful swaps</span>
            </div>

            <div>
              <strong>4.9/5</strong>
              <span>Community rating</span>
            </div>
          </div>
        </section>

        {/* ========================================= */}
        {/* CATEGORIES */}
        {/* ========================================= */}

        <section className="landing-section">
          <div className="landing-container">
            <div className="landing-section-heading">
              <div>
                <span>EXPLORE</span>

                <h2>Find something worth swapping.</h2>
              </div>

              <button onClick={() => navigate("/products")}>
                View all
                <ArrowRight size={13} />
              </button>
            </div>

            <div className="landing-category-grid">
              {categories.map((category) => {
                const Icon = category.icon;

                return (
                  <button
                    key={category.title}
                    className="landing-category-card"
                    onClick={() => navigate("/products")}
                  >
                    <div className="landing-category-icon">
                      <Icon size={20} />
                    </div>

                    <div>
                      <h3>{category.title}</h3>

                      <span>{category.count}</span>
                    </div>

                    <ArrowUpRight
                      className="landing-category-arrow"
                      size={15}
                    />
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* ========================================= */}
        {/* HOW IT WORKS */}
        {/* ========================================= */}

        <section className="landing-how">
          <div className="landing-container">
            <div className="landing-section-heading landing-centered-heading">
              <div>
                <span>HOW IT WORKS</span>

                <h2>Swap in three simple steps.</h2>

                <p>
                  No complicated process. Just find something you want and trade
                  something you already own.
                </p>
              </div>
            </div>

            <div className="landing-steps">
              {steps.map((step, index) => (
                <div className="landing-step" key={step.number}>
                  <span className="landing-step-number">{step.number}</span>

                  <div className="landing-step-line" />

                  <h3>{step.title}</h3>

                  <p>{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ========================================= */}
        {/* WHY BARTERX */}
        {/* ========================================= */}

        <section className="landing-section">
          <div className="landing-container landing-why-grid">
            <div className="landing-why-visual">
              <div className="landing-why-box">
                <div className="landing-why-purple-circle">
                  <Repeat2 size={30} />
                </div>

                <span>YOUR PRODUCT</span>

                <strong>↕</strong>

                <span>THEIR PRODUCT</span>
              </div>

              <div className="landing-why-decoration one" />
              <div className="landing-why-decoration two" />
            </div>

            <div className="landing-why-content">
              <span className="landing-eyebrow">WHY BARTERX</span>

              <h2>Trade smarter, not harder.</h2>

              <p>
                BarterX brings the simplicity of traditional bartering to a
                modern marketplace built for today's users.
              </p>

              <div className="landing-benefits">
                <div>
                  <div>
                    <ShieldCheck size={15} />
                  </div>

                  <section>
                    <h3>Community focused</h3>

                    <p>Connect with people and discover items around you.</p>
                  </section>
                </div>

                <div>
                  <div>
                    <Users size={15} />
                  </div>

                  <section>
                    <h3>Built for people</h3>

                    <p>
                      Simple profiles and direct communication make every swap
                      easy.
                    </p>
                  </section>
                </div>

                <div>
                  <div>
                    <Repeat2 size={15} />
                  </div>

                  <section>
                    <h3>Flexible swapping</h3>

                    <p>
                      Decide what you want and negotiate directly with other
                      users.
                    </p>
                  </section>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================= */}
        {/* CTA */}
        {/* ========================================= */}

        <section className="landing-cta">
          <div className="landing-container">
            <div className="landing-cta-box">
              <div className="landing-cta-decoration" />

              <span>READY TO START?</span>

              <h2>Your next great swap is waiting.</h2>

              <p>
                List something you own or explore products from the BarterX
                community.
              </p>

              <div className="landing-cta-actions">
                <button onClick={() => navigate("/products")}>
                  Start Exploring
                  <ArrowRight size={14} />
                </button>

                <button onClick={() => navigate("/add-product")}>
                  Add a Product
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default Landing;
