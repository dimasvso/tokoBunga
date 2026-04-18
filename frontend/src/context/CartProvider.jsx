import { useEffect, useState } from "react";
import { CartContext } from "./CartContext";
import {
  getCart,
  addToCart,
  updateCartItem,
  removeCartItem,
} from "../api/cart";
import { useAuth } from "./AuthContext";

export const CartProvider = ({ children }) => {
  const { user } = useAuth();
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchCart = async () => {
    setLoading(true);
    try {
      const data = await getCart();
      setCart(data);
    } catch (error) {
      console.error("Failed to fetch cart:", error);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    if (user) {
      fetchCart();
    } else {
      setCart(null);
    }
  }, [user]);

  const addItem = async (productId, quantity = 1) => {
    try {
      const data = await addToCart(productId, quantity);
      setCart(data);
    } catch (error) {
      const message =
        error.response?.data?.error || "Gagal menambahkan ke cart.";
      throw new Error(message);
    }
  };

  const updateItem = async (itemId, quantity) => {
    try {
      await updateCartItem(itemId, quantity);
      await fetchCart();
    } catch (error) {
      console.error("Failed to update item:", error);
      throw error;
    }
  };

  const removeItem = async (itemId) => {
    try {
      await removeCartItem(itemId);
      await fetchCart();
    } catch (error) {
      console.error("Failed to remove item:", error);
      throw error;
    }
  };

  const totalItems =
    cart?.items?.reduce((sum, item) => sum + item.quantity, 0) ?? 0;

  return (
    <CartContext.Provider
      value={{
        cart,
        loading,
        totalItems,
        addItem,
        updateItem,
        removeItem,
        fetchCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
