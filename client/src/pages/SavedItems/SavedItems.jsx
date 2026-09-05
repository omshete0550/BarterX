import { Navigate } from "react-router-dom";

// Saved Items and Wishlist are one collection. Preserve the old URL only.
function SavedItems() {
  return <Navigate to="/wishlist" replace />;
}

export default SavedItems;
