const normalizedValue = (value) => value.toLowerCase().replace(/\s+/g, "-");

export const buildProductQuery = ({ search = "", category = "All", condition = "All", location = "", sort = "Latest", page = 1, limit = 12 }) => ({
  ...(search.trim() && { search: search.trim() }),
  ...(category !== "All" && { category: normalizedValue(category) }),
  ...(condition !== "All" && { condition: normalizedValue(condition) }),
  ...(location.trim() && { location: location.trim() }),
  sort: ({ Latest: "newest", Oldest: "oldest", "A-Z": "title-asc", "Z-A": "title-desc" })[sort] || "newest",
  page,
  limit,
});
