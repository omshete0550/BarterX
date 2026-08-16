import { SlidersHorizontal, MapPin, ChevronDown } from "lucide-react";

import "../../styles/product/product-filters.css";

function ProductFilters({ filters, setFilters }) {
  const updateFilter = (name, value) => {
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="product-filters">
      <div className="filter-header">
        <div>
          <SlidersHorizontal size={17} />

          <span>Filters</span>
        </div>

        <button
          onClick={() =>
            setFilters({
              category: "All",
              condition: "All",
              location: "",
              sort: "Latest",
            })
          }
        >
          Clear All
        </button>
      </div>

      {/* Category */}

      <div className="filter-group">
        <label>Category</label>

        <div className="filter-select-wrapper">
          <select
            value={filters.category}
            onChange={(e) => updateFilter("category", e.target.value)}
          >
            <option>All</option>
            <option>Electronics</option>
            <option>Books</option>
            <option>Furniture</option>
            <option>Sports</option>
            <option>Music</option>
            <option>Fashion</option>
          </select>

          <ChevronDown size={15} />
        </div>
      </div>

      {/* Condition */}

      <div className="filter-group">
        <label>Condition</label>

        <div className="filter-select-wrapper">
          <select
            value={filters.condition}
            onChange={(e) => updateFilter("condition", e.target.value)}
          >
            <option>All</option>
            <option>Like New</option>
            <option>Good</option>
            <option>Fair</option>
          </select>

          <ChevronDown size={15} />
        </div>
      </div>

      {/* Location */}

      <div className="filter-group">
        <label>Location</label>

        <div className="filter-location">
          <MapPin size={15} />

          <input
            type="text"
            placeholder="e.g. Pune"
            value={filters.location}
            onChange={(e) => updateFilter("location", e.target.value)}
          />
        </div>
      </div>

      {/* Sort */}

      <div className="filter-group">
        <label>Sort By</label>

        <div className="filter-select-wrapper">
          <select
            value={filters.sort}
            onChange={(e) => updateFilter("sort", e.target.value)}
          >
            <option>Latest</option>
            <option>Oldest</option>
            <option>A-Z</option>
            <option>Z-A</option>
          </select>

          <ChevronDown size={15} />
        </div>
      </div>
    </div>
  );
}

export default ProductFilters;
