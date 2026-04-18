import api from "./axios";

export const getCart = async () => {
  const res = await api.get("api/cart/");
  return res.data;
};

export const addToCart = async (productId, quantity = 1) => {
  const res = await api.post("api/cart/", {
    product_id: productId,
    quantity,
  });
  return res.data;
};

export const updateCartItem = async (itemId, quantity) => {
  const res = await api.patch(`api/cart/items/${itemId}/`, { quantity });
  return res.data;
};

export const removeCartItem = async (itemId) => {
  await api.delete(`api/cart/items/${itemId}/`);
};