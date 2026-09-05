import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import productReducer from "../features/products/productSlice";
import wishlistReducer from "../features/wishlist/wishlistSlice";
import barterReducer from "../features/barter/barterSlice";
import notificationReducer from "../features/notifications/notificationSlice";
import messageReducer from "../features/messages/messageSlice";
import ratingReducer from "../features/ratings/ratingSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productReducer,
    wishlist: wishlistReducer,
    barter: barterReducer,
    notifications: notificationReducer,
    messages: messageReducer,
    ratings: ratingReducer,
  },
});
