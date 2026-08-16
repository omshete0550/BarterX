import { useMemo, useState } from "react";
import { Search, SlidersHorizontal, ChevronDown } from "lucide-react";

import Navbar from "../../component/layout/Navbar";
import Footer from "../../component/layout/Footer";

import Button from "../../component/common/Button";
import ProductGrid from "../../component/product/ProductGrid";
import CategoryNav from "../../component/product/CategoryNav";
import ProductFilters from "../../component/product/ProductFilters";

import products from "../../data/product";

import "./ProductListing.css";

function ProductListing() {
  const [activeCategory, setActiveCategory] = useState("All");

  const [search, setSearch] = useState("");

  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const [filters, setFilters] = useState({
    category: "All",
    condition: "All",
    location: "",
    sort: "Latest",
  });

  const [loading] = useState(false);

  const [error] = useState(false);

  /*
   * Filter products
   */
  const filteredProducts = useMemo(() => {
    let result = [...products];

    /*
     * Category from category navigation
     */
    if (activeCategory !== "All") {
      result = result.filter((product) => product.category === activeCategory);
    }

    /*
     * Category from sidebar filter
     */
    if (filters.category !== "All" && activeCategory === "All") {
      result = result.filter(
        (product) => product.category === filters.category,
      );
    }

    /*
     * Condition
     */
    if (filters.condition !== "All") {
      result = result.filter(
        (product) => product.condition === filters.condition,
      );
    }

    /*
     * Location
     */
    if (filters.location.trim()) {
      result = result.filter((product) =>
        product.location.toLowerCase().includes(filters.location.toLowerCase()),
      );
    }

    /*
     * Search
     */
    if (search.trim()) {
      const query = search.toLowerCase();

      result = result.filter((product) => {
        return (
          product.title.toLowerCase().includes(query) ||
          product.category.toLowerCase().includes(query) ||
          product.location.toLowerCase().includes(query) ||
          product.desiredProduct.toLowerCase().includes(query)
        );
      });
    }

    /*
     * Sorting
     */
    if (filters.sort === "A-Z") {
      result.sort((a, b) => a.title.localeCompare(b.title));
    }

    if (filters.sort === "Z-A") {
      result.sort((a, b) => b.title.localeCompare(a.title));
    }

    if (filters.sort === "Oldest") {
      result.reverse();
    }

    return result;
  }, [activeCategory, filters, search]);

  /*
   * Category change
   */
  const handleCategoryChange = (category) => {
    setActiveCategory(category);

    setFilters((prev) => ({
      ...prev,
      category: "All",
    }));
  };

  /*
   * Error state
   */
  if (error) {
    return (
      <div className="products-page">
        <Navbar />

        <main className="products-error">
          <div className="products-error-icon">!</div>

          <h2>Something went wrong</h2>

          <p>We couldn't load the products. Please try again.</p>

          <Button>Try Again</Button>
        </main>

        <Footer />
      </div>
    );
  }

  return (
    <div className="products-page">
      <Navbar />

      <main>
        {/* ================================= */}
        {/* Page Header */}
        {/* ================================= */}

        <section className="products-header">
          <div className="products-container">
            <div className="products-breadcrumb">
              Home
              <span>/</span>
              Products
            </div>

            <div className="products-heading">
              <div>
                <span className="products-eyebrow">Marketplace</span>

                <h1>Explore Products</h1>

                <p>
                  Discover products you can exchange with the BarterX community.
                </p>
              </div>

              <div className="products-total">
                <strong>{filteredProducts.length}</strong>

                <span>Products available</span>
              </div>
            </div>
          </div>
        </section>

        {/* ================================= */}
        {/* Search + Categories */}
        {/* ================================= */}

        <section className="products-controls">
          <div className="products-container">
            <div className="products-search-row">
              {/* Search */}

              <div className="products-search">
                <Search size={18} />

                <input
                  type="text"
                  placeholder="Search products, categories, locations..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />

                {search && (
                  <button
                    className="clear-search"
                    onClick={() => setSearch("")}
                  >
                    ×
                  </button>
                )}
              </div>

              {/* Mobile filters */}

              <Button
                variant="outline"
                className="mobile-filter-button"
                icon={<SlidersHorizontal size={16} />}
                onClick={() => setMobileFiltersOpen(true)}
              >
                Filters
              </Button>
            </div>

            <CategoryNav
              activeCategory={activeCategory}
              onCategoryChange={handleCategoryChange}
            />
          </div>
        </section>

        {/* ================================= */}
        {/* Main Products Area */}
        {/* ================================= */}

        <section className="products-content">
          <div className="products-container">
            <div className="products-layout">
              {/* =========================== */}
              {/* Desktop Sidebar */}
              {/* =========================== */}

              <aside className="products-sidebar">
                <ProductFilters filters={filters} setFilters={setFilters} />
              </aside>

              {/* =========================== */}
              {/* Product Results */}
              {/* =========================== */}

              <div className="products-results">
                <div className="products-results-header">
                  <div>
                    <span>Showing</span>

                    <strong>{filteredProducts.length}</strong>

                    <span>results</span>
                  </div>

                  {/* Sort */}

                  <div className="sort-wrapper">
                    <label>Sort:</label>

                    <div className="sort-select">
                      <select
                        value={filters.sort}
                        onChange={(e) =>
                          setFilters((prev) => ({
                            ...prev,
                            sort: e.target.value,
                          }))
                        }
                      >
                        <option>Latest</option>

                        <option>Oldest</option>

                        <option>A-Z</option>

                        <option>Z-A</option>
                      </select>

                      <ChevronDown size={14} />
                    </div>
                  </div>
                </div>

                {/* Products */}

                <ProductGrid products={filteredProducts} loading={loading} />
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ================================= */}
      {/* Mobile Filter Drawer */}
      {/* ================================= */}

      {mobileFiltersOpen && (
        <div className="mobile-filter-overlay">
          <div
            className="mobile-filter-backdrop"
            onClick={() => setMobileFiltersOpen(false)}
          />

          <div className="mobile-filter-drawer">
            <div className="mobile-filter-header">
              <h3>Filters</h3>

              <button onClick={() => setMobileFiltersOpen(false)}>×</button>
            </div>

            <ProductFilters filters={filters} setFilters={setFilters} />

            <Button fullWidth onClick={() => setMobileFiltersOpen(false)}>
              Show {filteredProducts.length} Products
            </Button>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

export default ProductListing;
