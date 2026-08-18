import { Routes, Route } from "react-router-dom";

import Landing from "../pages/Landing/Landing";
import Home from "../pages/Home/Home";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import ProductListing from "../pages/Products/ProductListing";
import ProductDetail from "../pages/ProductDetail/ProductDetail";
import SwapRequest from "../pages/SwapRequest/SwapRequest";
import Messages from "../pages/Messages/Messages";
import Wishlist from "../pages/Wishlist/Wishlist";
import Profile from "../pages/Profile/Profile";
import EditProfile from "../pages/EditProfile/EditProfile";
import MyProducts from "../pages/MyProducts/MyProducts";
import EditProduct from "../pages/EditProduct/EditProduct";
import SavedItems from "../pages/SavedItems/SavedItems";
import AddProduct from "../pages/AddProduct/AddProduct";
import Notifications from "../pages/Notifications/Notifications";
import CategoryProducts from "../pages/CategoryProducts/CategoryProducts";
import SearchResults from "../pages/SearchResults/SearchResults";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/home" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/products" element={<ProductListing />} />
      <Route path="/products/:id" element={<ProductDetail />} />
      <Route path="/swap/:id" element={<SwapRequest />} />
      <Route path="/messages" element={<Messages />} />
      <Route path="/wishlist" element={<Wishlist />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/profile/edit" element={<EditProfile />} />
      <Route path="/my-products" element={<MyProducts />} />
      <Route path="/products/edit/:id" element={<EditProduct />} />
      <Route path="/saved-items" element={<SavedItems />} />
      <Route path="/add-product" element={<AddProduct />} />
      <Route path="/notifications" element={<Notifications />} />
      <Route path="/category/:category" element={<CategoryProducts />} />
      <Route path="/search" element={<SearchResults />} />
    </Routes>
  );
}

export default AppRoutes;
