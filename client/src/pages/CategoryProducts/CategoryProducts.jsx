import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";

import products from "../../data/product";
import ProductGrid from "../../component/product/ProductGrid";
import CategoryNav from "../../component/product/CategoryNav";
import ProductFilters from "../../component/product/ProductFilters";

import "./CategoryProducts.css";

function CategoryProducts() {
  const { category } = useParams();

  const categoryName = category
    ? category.charAt(0).toUpperCase() + category.slice(1)
    : "All Products";

  const [filters, setFilters] = useState({
    condition: "All",
    location: "All",
    sort: "Newest",
  });

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Category
    if (category && category.toLowerCase() !== "all") {
      result = result.filter(
        (product) => product.category.toLowerCase() === category.toLowerCase(),
      );
    }

    // Condition
    if (filters.condition !== "All") {
      result = result.filter(
        (product) => product.condition === filters.condition,
      );
    }

    // Location
    if (filters.location !== "All") {
      result = result.filter(
        (product) => product.location === filters.location,
      );
    }

    // Sort
    if (filters.sort === "A-Z") {
      result.sort((a, b) => a.title.localeCompare(b.title));
    }

    if (filters.sort === "Z-A") {
      result.sort((a, b) => b.title.localeCompare(a.title));
    }

    return result;
  }, [category, filters]);

  const handleFilterChange = (updatedFilters) => {
    setFilters(updatedFilters);
  };

  return (
    <div className="category-products-page">
      {/* =================================================
                HERO
            ================================================= */}

      <section className="category-products-hero">
        <div className="category-products-container">
          <div className="category-breadcrumb">
            Home
            <span>›</span>
            Categories
            <span>›</span>
            <strong>{categoryName}</strong>
          </div>

          <div className="category-hero-content">
            <div>
              <span className="category-eyebrow">EXPLORE CATEGORY</span>

              <h1>{categoryName}</h1>

              <p>
                Discover products from the BarterX community and find something
                worth swapping.
              </p>
            </div>

            <div className="category-count">
              <strong>{filteredProducts.length}</strong>

              <span>Products</span>
            </div>
          </div>
        </div>
      </section>

      {/* =================================================
                CATEGORY NAVIGATION
            ================================================= */}

      <section className="category-navigation-section">
        <div className="category-products-container">
          <CategoryNav />
        </div>
      </section>

      {/* =================================================
                MAIN CONTENT
            ================================================= */}

      <main className="category-products-main">
        <div className="category-products-container">
          <div className="category-products-layout">
            {/* Filters */}
            <aside className="category-filter-sidebar">
              <div className="filter-sidebar-heading">
                <h2>Filter Products</h2>

                <span>Refine</span>
              </div>

              <ProductFilters
                filters={filters}
                onFilterChange={handleFilterChange}
              />
            </aside>

            {/* Products */}
            <section className="category-product-content">
              <div className="products-toolbar">
                <div>
                  <span>SHOWING</span>

                  <h2>{categoryName} Products</h2>
                </div>

                <div className="product-result-count">
                  {filteredProducts.length} items
                </div>
              </div>

              {filteredProducts.length > 0 ? (
                <ProductGrid products={filteredProducts} />
              ) : (
                <div className="category-empty-state">
                  <div className="category-empty-icon">⌕</div>

                  <h3>No products found</h3>

                  <p>
                    We couldn't find products matching your current filters.
                  </p>

                  <button
                    type="button"
                    onClick={() =>
                      setFilters({
                        condition: "All",
                        location: "All",
                        sort: "Newest",
                      })
                    }
                  >
                    Clear Filters
                  </button>
                </div>
              )}
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}

export default CategoryProducts;
