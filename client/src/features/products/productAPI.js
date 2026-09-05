import api from "../../api/axios";

const toFormData = (details) => {
  const formData = new FormData();

  Object.entries(details).forEach(([key, value]) => {
    if (key === "images") {
      value.forEach((file) => formData.append("images", file));
    } else {
      formData.append(key, value);
    }
  });

  return formData;
};

export const getProductsRequest = (params = {}) => api.get("/products", { params });
export const getProductRequest = (productId) => api.get(`/products/${productId}`);
export const createProductRequest = (productDetails) =>
  api.post("/products", toFormData(productDetails));
export const getMyProductsRequest = () => api.get("/products/my");
export const updateProductRequest = (id, details) =>
  api.put(`/products/${id}`, toFormData(details));
export const deleteProductRequest = (id) => api.delete(`/products/${id}`);
