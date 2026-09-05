import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Search, SlidersHorizontal, ChevronDown } from "lucide-react";

import Navbar from "../../component/layout/Navbar";
import Footer from "../../component/layout/Footer";

import Button from "../../component/common/Button";
import ProductGrid from "../../component/product/ProductGrid";
import CategoryNav from "../../component/product/CategoryNav";
import ProductFilters from "../../component/product/ProductFilters";
import ProductPagination from "../../component/product/ProductPagination";

import { fetchProducts } from "../../features/products/productSlice";
import { buildProductQuery } from "../../features/products/productQuery";

import "./ProductListing.css";

function ProductListing() {
  const dispatch = useDispatch();
  const { items: products, pagination, loading, error } = useSelector((state) => state.products);
  const [activeCategory, setActiveCategory] = useState("All");

  const [search, setSearch] = useState("");

  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [page, setPage] = useState(1);

  const [filters, setFilters] = useState({
    category: "All",
    condition: "All",
    location: "",
    sort: "Latest",
  });

  const query = useMemo(() => buildProductQuery({
    search,
    category: activeCategory !== "All" ? activeCategory : filters.category,
    condition: filters.condition,
    location: filters.location,
    sort: filters.sort,
    page,
  }), [activeCategory, filters, page, search]);

  useEffect(() => { dispatch(fetchProducts(query)); }, [dispatch, query]);

  const updateFilters = (updater) => {
    setPage(1);
    setFilters(updater);
  };

  /*
   * Category change
   */
  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    setPage(1);

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

          <p>{error || "We couldn't load the products. Please try again."}</p>

          <Button onClick={() => dispatch(fetchProducts(query))}>Try Again</Button>
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
                <strong>{pagination?.totalProducts || 0}</strong>

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
                  onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                />

                {search && (
                  <button
                    className="clear-search"
                    onClick={() => { setSearch(""); setPage(1); }}
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
                <ProductFilters filters={filters} setFilters={updateFilters} />
              </aside>

              {/* =========================== */}
              {/* Product Results */}
              {/* =========================== */}

              <div className="products-results">
                <div className="products-results-header">
                  <div>
                    <span>Showing</span>

                    <strong>{pagination?.totalProducts || 0}</strong>

                    <span>results</span>
                  </div>

                  {/* Sort */}

                  <div className="sort-wrapper">
                    <label>Sort:</label>

                    <div className="sort-select">
                      <select
                        value={filters.sort}
                        onChange={(e) => {
                          setPage(1);
                          setFilters((prev) => ({
                            ...prev,
                            sort: e.target.value,
                          }));
                        }}
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

                <ProductGrid products={products} loading={loading} />
                <ProductPagination pagination={pagination} onPageChange={setPage} />
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

            <ProductFilters filters={filters} setFilters={updateFilters} />

            <Button fullWidth onClick={() => setMobileFiltersOpen(false)}>
              Show {pagination?.totalProducts || 0} Products
            </Button>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

export default ProductListing;
