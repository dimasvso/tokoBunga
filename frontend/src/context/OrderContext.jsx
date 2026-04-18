import { createContext, useContext } from "react";

export const OrderContext = createContext(null);

export const useOrders = () => {
  const context = useContext(OrderContext);
  if (!context) throw new Error("useOrders harus dipakai di dalam OrderProvider");
  return context;
};