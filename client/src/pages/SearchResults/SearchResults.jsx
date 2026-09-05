import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { fetchProducts } from "../../features/products/productSlice";
import ProductGrid from "../../component/product/ProductGrid";
import ProductFilters from "../../component/product/ProductFilters";
import ProductPagination from "../../component/product/ProductPagination";
import { buildProductQuery } from "../../features/products/productQuery";

import "./SearchResults.css";

function SearchResults() {
  const dispatch = useDispatch();
  const { items: products, pagination, loading } = useSelector((state) => state.products);
  const [searchParams, setSearchParams] = useSearchParams();

  const initialQuery = searchParams.get("q") || "";

  const [searchInput, setSearchInput] = useState(initialQuery);

  const [filters, setFilters] = useState({
    category: "All",
    condition: "All",
    location: "",
    sort: "Latest",
  });
  const [page, setPage] = useState(1);

  const query = initialQuery.trim();
  const productQuery = useMemo(() => buildProductQuery({ ...filters, search: query, page }), [filters, page, query]);
  useEffect(() => { dispatch(fetchProducts(productQuery)); }, [dispatch, productQuery]);

  const handleSearch = (e) => {
    e.preventDefault();

    const trimmedSearch = searchInput.trim();

    if (trimmedSearch) {
      setSearchParams({
        q: trimmedSearch,
      });
    } else {
      setSearchParams({});
    }
    setPage(1);
  };

  const clearSearch = () => {
    setSearchInput("");
    setSearchParams({});
    setPage(1);
  };

  const clearFilters = () => {
    setPage(1);
    setFilters({
      condition: "All",
      category: "All",
      location: "",
      sort: "Latest",
    });
  };

  return (
    <div className="search-results-page">
      {/* =================================================
                HERO
            ================================================= */}

      <section className="search-results-hero">
        <div className="search-results-container">
          {/* Breadcrumb */}

          <div className="search-breadcrumb">
            <span>Home</span>

            <b>›</b>

            <strong>Search</strong>
          </div>

          {/* Heading */}

          <div className="search-heading">
            <div className="search-heading-content">
              <span className="search-eyebrow">BARterX MARKETPLACE</span>

              <h1>Search Results</h1>

              <p>Find products you want to swap with the BarterX community.</p>
            </div>

            <div className="search-result-circle">
              <strong>{pagination?.totalProducts || 0}</strong>

              <span>Results</span>
            </div>
          </div>

          {/* Search Box */}

          <form className="results-search-box" onSubmit={handleSearch}>
            <span className="results-search-icon">⌕</span>

            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search products, categories..."
              aria-label="Search products"
            />

            {searchInput && (
              <button
                type="button"
                className="clear-search-btn"
                onClick={clearSearch}
              >
                ×
              </button>
            )}

            <button type="submit" className="search-submit-btn">
              Search
            </button>
          </form>
        </div>
      </section>

      {/* =================================================
                MAIN
            ================================================= */}

      <main className="search-results-main">
        <div className="search-results-container">
          <div className="search-results-layout">
            {/* =================================================
                            FILTERS
                        ================================================= */}

            <aside className="search-filter-sidebar">
              <div className="search-filter-header">
                <div>
                  <span>REFINE</span>

                  <h2>Filters</h2>
                </div>

                <button type="button" onClick={clearFilters}>
                  Reset
                </button>
              </div>

              <ProductFilters filters={filters} setFilters={setFilters} />
            </aside>

            {/* =================================================
                            RESULTS
                        ================================================= */}

            <section className="search-results-content">
              {/* Toolbar */}

              <div className="search-results-toolbar">
                <div>
                  {query ? (
                    <>
                      <span className="results-label">SEARCHING FOR</span>

                      <h2>"{initialQuery}"</h2>
                    </>
                  ) : (
                    <>
                      <span className="results-label">BROWSE</span>

                      <h2>All Products</h2>
                    </>
                  )}
                </div>

                <div className="results-count">
                  {pagination?.totalProducts || 0}{" "}
                  {pagination?.totalProducts === 1 ? "product" : "products"}
                </div>
              </div>

              {/* Active Search */}

              {query && (
                <div className="active-search">
                  <span>Search:</span>

                  <strong>{initialQuery}</strong>

                  <button type="button" onClick={clearSearch}>
                    ×
                  </button>
                </div>
              )}

              {/* Products */}

              {products.length > 0 ? (
                <><ProductGrid products={products} loading={loading} /><ProductPagination pagination={pagination} onPageChange={setPage} /></>
              ) : (
                <div className="search-empty-state">
                  <div className="search-empty-icon">⌕</div>

                  <h3>No products found</h3>

                  <p>
                    We couldn't find anything matching
                    {query ? ` "${initialQuery}".` : " your filters."}
                  </p>

                  <div className="empty-actions">
                    {query && (
                      <button
                        type="button"
                        onClick={clearSearch}
                        className="primary-empty-btn"
                      >
                        Clear Search
                      </button>
                    )}

                    <button
                      type="button"
                      onClick={clearFilters}
                      className="secondary-empty-btn"
                    >
                      Reset Filters
                    </button>
                  </div>
                </div>
              )}
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}

export default SearchResults;
