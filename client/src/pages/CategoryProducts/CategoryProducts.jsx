import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { fetchProducts } from "../../features/products/productSlice";
import ProductGrid from "../../component/product/ProductGrid";
import CategoryNav from "../../component/product/CategoryNav";
import ProductFilters from "../../component/product/ProductFilters";
import ProductPagination from "../../component/product/ProductPagination";
import { buildProductQuery } from "../../features/products/productQuery";

import "./CategoryProducts.css";

function CategoryProducts() {
  const dispatch = useDispatch();
  const { items: products, pagination, loading } = useSelector((state) => state.products);
  const { category } = useParams();
  const navigate = useNavigate();

  const categoryName = category
    ? category.charAt(0).toUpperCase() + category.slice(1)
    : "All Products";

  const [filters, setFilters] = useState({
    category: "All",
    condition: "All",
    location: "",
    sort: "Latest",
  });
  const [page, setPage] = useState(1);

  const query = useMemo(() => buildProductQuery({ ...filters, category: category && category.toLowerCase() !== "all" ? category : filters.category, page }), [category, filters, page]);
  useEffect(() => { dispatch(fetchProducts(query)); }, [dispatch, query]);

  const handleFilterChange = (updatedFilters) => {
    setPage(1);
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
              <strong>{pagination?.totalProducts || 0}</strong>

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
          <CategoryNav activeCategory={categoryName} onCategoryChange={(name) => navigate(name === "All" ? "/products" : `/category/${name.toLowerCase()}`)} />
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

              <ProductFilters filters={filters} setFilters={handleFilterChange} />
            </aside>

            {/* Products */}
            <section className="category-product-content">
              <div className="products-toolbar">
                <div>
                  <span>SHOWING</span>

                  <h2>{categoryName} Products</h2>
                </div>

                <div className="product-result-count">
                  {pagination?.totalProducts || 0} items
                </div>
              </div>

              {products.length > 0 ? (
                <><ProductGrid products={products} loading={loading} /><ProductPagination pagination={pagination} onPageChange={setPage} /></>
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
                      handleFilterChange({
                        category: "All",
                        condition: "All",
                        location: "",
                        sort: "Latest",
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
