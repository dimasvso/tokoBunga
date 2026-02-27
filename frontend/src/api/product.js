import api from "./axios";

export const getProducts = async () => {
  const res = await api.get("api/products/");
  return res.data;
};

export const createProduct = async (data) => {
  let config = {};
  if (data instanceof FormData) {
    config.headers = { "Content-Type": "multipart/form-data" };
  }
  const res = await api.post("api/products/", data, config);
  return res.data;
};

export const updateProduct = async (id, data) => {
  let config = {};
  if (data instanceof FormData) {
    config.headers = { "Content-Type": "multipart/form-data" };
  }
  const res = await api.put(`api/products/${id}/`, data, config);
  return res.data;
};

export const deleteProduct = async (id) => {
  const res = await api.delete(`api/products/${id}/`);
  return res.data;
};

// Get single product by id
export const getProductById = async (id) => {
  const res = await api.get(`api/products/${id}/`);
  return res.data;
};
