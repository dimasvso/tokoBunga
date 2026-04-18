import api from "./axios";

export const createOrder = async (data) => {
  const res = await api.post("api/orders/", data);
  return res.data;
};

export const getOrders = async () => {
  const res = await api.get("api/orders/");
  return res.data;
};

export const getOrderById = async (id) => {
  const res = await api.get(`api/orders/${id}/`);
  return res.data;
};

export const updateOrderStatus = async (id, status) => {
  const res = await api.patch(`api/orders/${id}/status/`, { status });
  return res.data;
};