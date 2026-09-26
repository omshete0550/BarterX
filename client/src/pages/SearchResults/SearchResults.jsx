import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { clearVisualSearch, fetchProducts, searchProductsByImage } from "../../features/products/productSlice";
import ProductGrid from "../../component/product/ProductGrid";
import ProductFilters from "../../component/product/ProductFilters";
import ProductPagination from "../../component/product/ProductPagination";
import VisualSearchButton from "../../component/search/VisualSearchButton";
import { buildProductQuery } from "../../features/products/productQuery";

import "./SearchResults.css";

function SearchResults() {
  const dispatch = useDispatch();
  const {
    items,
    pagination,
    loading,
    visualItems,
    visualPagination,
    visualLoading,
  } = useSelector((state) => state.products);
  const [searchParams, setSearchParams] = useSearchParams();

  const initialQuery = searchParams.get("q") || "";
  const visualMode = searchParams.get("mode") === "visual";

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
  useEffect(() => {
    if (!visualMode) dispatch(fetchProducts(productQuery));
  }, [dispatch, productQuery, visualMode]);

  const products = visualMode ? visualItems : items;
  const currentPagination = visualMode ? visualPagination : pagination;
  const resultsLoading = visualMode ? visualLoading : loading;

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
    dispatch(clearVisualSearch());
    setPage(1);
  };

  const handleVisualSearch = async (image) => {
    await dispatch(searchProductsByImage(image)).unwrap();
    setSearchInput("");
    setSearchParams({ mode: "visual" });
    setPage(1);
  };

  const clearSearch = () => {
    setSearchInput("");
    setSearchParams({});
    dispatch(clearVisualSearch());
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
              <strong>{currentPagination?.totalProducts || 0}</strong>

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

          <VisualSearchButton
            onSearch={handleVisualSearch}
            loading={visualLoading}
            initiallyOpen={visualMode && !visualItems.length}
          />
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
                  {visualMode ? (
                    <>
                      <span className="results-label">VISUAL SEARCH</span>

                      <h2>Visually similar products</h2>
                    </>
                  ) : query ? (
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
                  {currentPagination?.totalProducts || 0}{" "}
                  {currentPagination?.totalProducts === 1 ? "product" : "products"}
                </div>
              </div>

              {/* Active Search */}

              {visualMode ? (
                <div className="active-search">
                  <span>Search:</span>

                  <strong>Photo match</strong>

                  <button type="button" onClick={clearSearch} aria-label="Clear visual search">
                    Ã—
                  </button>
                </div>
              ) : query && (
                <div className="active-search">
                  <span>Search:</span>

                  <strong>{initialQuery}</strong>

                  <button type="button" onClick={clearSearch}>
                    ×
                  </button>
                </div>
              )}

              {/* Products */}

              {resultsLoading ? (
                <ProductGrid products={[]} loading />
              ) : products.length > 0 ? (
                <>
                  <ProductGrid products={products} />
                  {!visualMode && <ProductPagination pagination={currentPagination} onPageChange={setPage} />}
                </>
              ) : (
                <div className="search-empty-state">
                  <div className="search-empty-icon">⌕</div>

                  <h3>No products found</h3>

                  <p>
                    {visualMode
                      ? "Take another clear photo or add more products with image embeddings."
                      : <>We couldn't find anything matching{query ? ` "${initialQuery}".` : " your filters."}</>}
                  </p>

                  <div className="empty-actions">
                    {(query || visualMode) && (
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
