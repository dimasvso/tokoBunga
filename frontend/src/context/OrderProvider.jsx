import { useState } from "react";
import { OrderContext } from "./OrderContext";
import { createOrder, getOrders, updateOrderStatus } from "../api/order";
import { useCart } from "./CartContext";

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { fetchCart } = useCart();

  const fetchOrders = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getOrders();
      setOrders(data);
    } catch (err) {
      setError("Gagal memuat orders.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const checkout = async (shippingAddress, note = "") => {
    setLoading(true);
    setError(null);
    try {
      const order = await createOrder({
        shipping_address: shippingAddress,
        note,
      });
      setOrders((prev) => [order, ...prev]); // tambah order baru ke depan list
      await fetchCart(); // refresh cart karena sudah dikosongkan backend
      return order;
    } catch (err) {
      const message = err.response?.data?.error || "Gagal checkout.";
      setError(message);
      throw new Error(message);
    } finally {
      setLoading(false);
    }
  };

  const changeStatus = async (orderId, status) => {
    try {
      const updated = await updateOrderStatus(orderId, status);
      setOrders((prev) =>
        prev.map((o) => (o.id === orderId ? updated : o))
      );
      return updated;
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  return (
    <OrderContext.Provider value={{
      orders,
      loading,
      error,
      fetchOrders,
      checkout,
      changeStatus,
    }}>
      {children}
    </OrderContext.Provider>
  );
};