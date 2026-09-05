import Button from "../common/Button";

function ProductPagination({ pagination, onPageChange }) {
  if (!pagination || pagination.totalPages <= 1) return null;
  return <nav aria-label="Product pages" className="product-pagination">
    <Button variant="outline" size="small" disabled={pagination.page <= 1} onClick={() => onPageChange(pagination.page - 1)}>Previous</Button>
    <span>Page {pagination.page} of {pagination.totalPages}</span>
    <Button variant="outline" size="small" disabled={pagination.page >= pagination.totalPages} onClick={() => onPageChange(pagination.page + 1)}>Next</Button>
  </nav>;
}

export default ProductPagination;
