import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home/Home";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import ProductListing from "../pages/Products/ProductListing";
import ProductDetail from "../pages/ProductDetail/ProductDetail";
import SwapRequest from "../pages/SwapRequest/SwapRequest";
import Messages from "../pages/Messages/Messages";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/products" element={<ProductListing />} />
      <Route path="/products/:id" element={<ProductDetail />} />
      <Route path="/swap/:id" element={<SwapRequest />} />
      <Route path="/messages" element={<Messages />} />
    </Routes>
  );
}

export default AppRoutes;
