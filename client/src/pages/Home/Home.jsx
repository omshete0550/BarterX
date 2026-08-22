import { useMemo, useState } from "react";

import {
  Search,
  ArrowRight,
  ShieldCheck,
  RefreshCcw,
  Users,
  Plus,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import Navbar from "../../component/layout/Navbar";
import Footer from "../../component/layout/Footer";

import Button from "../../component/common/Button";

import ProductGrid from "../../component/product/ProductGrid";
import CategoryNav from "../../component/product/CategoryNav";

import products from "../../data/product";

import "./Home.css";

function Home() {
  const navigate = useNavigate();

  const [activeCategory, setActiveCategory] = useState("All");

  const [search, setSearch] = useState("");

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory =
        activeCategory === "All" || product.category === activeCategory;

      const matchesSearch =
        product.title.toLowerCase().includes(search.toLowerCase()) ||
        product.category.toLowerCase().includes(search.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, search]);

  return (
    <div className="home-page">
      <Navbar />

      <main>
        {/* ======================= */}
        {/* Hero */}
        {/* ======================= */}

        <section className="home-hero">
          <div className="home-hero-container">
            <div className="home-hero-content">
              <span className="hero-eyebrow">
                ✦ The smarter way to exchange
              </span>

              <h1>
                What you have
                <br />
                <span>is worth something.</span>
              </h1>

              <p>
                Discover products you want, list things you no longer need, and
                swap with people in your community.
              </p>

              {/* Search */}

              <div className="hero-search">
                <Search size={20} />

                <input
                  type="text"
                  placeholder="Search for products..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      navigate(`/search?q=${search}`);
                    }
                  }}
                />

                <Button onClick={() => navigate(`/search?q=${search}`)}>
                  Search
                </Button>
              </div>

              {/* Hero actions */}

              <div className="hero-actions">
                <Button
                  size="large"
                  icon={<ArrowRight size={18} />}
                  onClick={() => navigate("/products")}
                >
                  Explore Products
                </Button>

                <Button
                  size="large"
                  variant="outline"
                  icon={<Plus size={18} />}
                  onClick={() => navigate("/add-product")}
                >
                  List a Product
                </Button>
              </div>
            </div>

            {/* Hero Visual */}

            <div className="home-hero-visual">
              <div className="hero-orbit orbit-one" />
              <div className="hero-orbit orbit-two" />

              <div className="hero-product-card hero-card-one">
                <img src={products[0].image} alt="" />

                <div>
                  <strong>Sony Headphones</strong>

                  <span>Wants: Gaming Keyboard</span>
                </div>
              </div>

              <div className="hero-product-card hero-card-two">
                <img src={products[2].image} alt="" />

                <div>
                  <strong>Mountain Bike</strong>

                  <span>Wants: Smart Watch</span>
                </div>
              </div>

              <div className="hero-center-icon">
                <RefreshCcw size={42} />
              </div>
            </div>
          </div>
        </section>

        {/* ======================= */}
        {/* Categories */}
        {/* ======================= */}

        <section className="home-section">
          <div className="section-container">
            <div className="section-heading">
              <div>
                <span className="section-label">Browse</span>

                <h2>Explore by category</h2>
              </div>

              <Button variant="ghost" onClick={() => navigate("/products")}>
                View all
                <ArrowRight size={16} />
              </Button>
            </div>

            <CategoryNav
              activeCategory={activeCategory}
              onCategoryChange={setActiveCategory}
            />
          </div>
        </section>

        {/* ======================= */}
        {/* Products */}
        {/* ======================= */}

        <section className="home-products">
          <div className="section-container">
            <div className="section-heading">
              <div>
                <span className="section-label">Fresh listings</span>

                <h2>Products you might like</h2>
              </div>

              <Button variant="ghost" onClick={() => navigate("/products")}>
                See all
                <ArrowRight size={16} />
              </Button>
            </div>

            <ProductGrid products={filteredProducts.slice(0, 8)} />
          </div>
        </section>

        {/* ======================= */}
        {/* How it works */}
        {/* ======================= */}

        <section className="how-section">
          <div className="section-container">
            <div className="center-heading">
              <span className="section-label">Simple & secure</span>

              <h2>How BarterX works</h2>

              <p>Exchange products in three simple steps.</p>
            </div>

            <div className="how-grid">
              <div className="how-card">
                <div className="how-number">01</div>

                <div className="how-icon">
                  <Plus size={25} />
                </div>

                <h3>List what you have</h3>

                <p>
                  Upload your product, describe its condition, and tell people
                  what you're looking for.
                </p>
              </div>

              <div className="how-card">
                <div className="how-number">02</div>

                <div className="how-icon">
                  <RefreshCcw size={25} />
                </div>

                <h3>Find your match</h3>

                <p>
                  Browse thousands of products and discover something you'd love
                  to exchange for.
                </p>
              </div>

              <div className="how-card">
                <div className="how-number">03</div>

                <div className="how-icon">
                  <Users size={25} />
                </div>

                <h3>Connect & swap</h3>

                <p>
                  Send a swap request, chat with the owner, and agree on the
                  exchange.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ======================= */}
        {/* Trust */}
        {/* ======================= */}

        <section className="trust-section">
          <div className="section-container">
            <div className="trust-content">
              <div>
                <span className="section-label">Built for trust</span>

                <h2>A better way to exchange.</h2>

                <p>
                  BarterX makes exchanging products simple, transparent, and
                  community driven.
                </p>
              </div>

              <div className="trust-features">
                <div>
                  <ShieldCheck size={22} />

                  <span>Verified community</span>
                </div>

                <div>
                  <RefreshCcw size={22} />

                  <span>Easy swap requests</span>
                </div>

                <div>
                  <Users size={22} />

                  <span>Connect directly</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ======================= */}
        {/* CTA */}
        {/* ======================= */}

        <section className="home-cta">
          <div className="cta-container">
            <div>
              <span>Ready to barter?</span>

              <h2>
                Turn unused things
                <br />
                into something you want.
              </h2>
            </div>

            <Button size="large" onClick={() => navigate("/add-product")}>
              Start Listing
              <ArrowRight size={18} />
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default Home;
