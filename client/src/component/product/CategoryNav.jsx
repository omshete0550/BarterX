import {
  LayoutGrid,
  Laptop,
  BookOpen,
  Sofa,
  Dumbbell,
  Music,
  Shirt,
} from "lucide-react";

import "../../styles/product/category-nav.css";

const categories = [
  {
    name: "All",
    icon: LayoutGrid,
  },
  {
    name: "Electronics",
    icon: Laptop,
  },
  {
    name: "Books",
    icon: BookOpen,
  },
  {
    name: "Furniture",
    icon: Sofa,
  },
  {
    name: "Sports",
    icon: Dumbbell,
  },
  {
    name: "Music",
    icon: Music,
  },
  {
    name: "Fashion",
    icon: Shirt,
  },
];

function CategoryNav({ activeCategory = "All", onCategoryChange }) {
  return (
    <div className="category-nav-wrapper">
      <div className="category-nav">
        {categories.map((category) => {
          const Icon = category.icon;

          const active = activeCategory === category.name;

          return (
            <button
              key={category.name}
              className={`category-item ${active ? "active" : ""}`}
              onClick={() => onCategoryChange?.(category.name)}
            >
              <span className="category-icon">
                <Icon size={18} />
              </span>

              <span>{category.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default CategoryNav;
