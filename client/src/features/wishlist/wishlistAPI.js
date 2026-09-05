import api from "../../api/axios";

export const getWishlistRequest = () => api.get("/wishlist");
export const addToWishlistRequest = (productId) => api.post(`/wishlist/${productId}`);
export const removeFromWishlistRequest = (productId) => api.delete(`/wishlist/${productId}`);
