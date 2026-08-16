import ProductCard from "./ProductCard";

import EmptyState from "../common/EmptyState";

import "../../styles/product/product-grid.css";

function ProductGrid({ products = [], loading = false }) {
  if (loading) {
    return (
      <div className="product-grid-loading">
        <div className="product-skeleton" />
        <div className="product-skeleton" />
        <div className="product-skeleton" />
        <div className="product-skeleton" />
      </div>
    );
  }

  if (!products.length) {
    return (
      <EmptyState
        title="No products found"
        message="Try changing your search or filters."
      />
    );
  }

  return (
    <div className="product-grid">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

export default ProductGrid;
