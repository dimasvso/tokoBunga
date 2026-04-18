import { createContext, useContext } from "react";

export const ProductsContext = createContext();

export const useProducts = () => {
  const context = useContext(ProductsContext);
  if (!context) throw new Error("useProducts harus dipakai di dalam ProductsProvider");
  return context;
};