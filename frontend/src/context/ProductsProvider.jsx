import { useState, useEffect } from "react";
import { ProductsContext } from "./ProductsContext";
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductById,
} from "../api/product";

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (err) {
      setError("Gagal memuat produk.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const addProduct = async (data) => {
    try {
      const newProduct = await createProduct(data);
      setProducts((prev) => [...prev, newProduct]); 
      return newProduct;
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  const editProduct = async (id, data) => {
    try {
      const updated = await updateProduct(id, data);
      setProducts((prev) =>
        prev.map((p) => (p.id === id ? updated : p)) 
      );
      return updated;
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  const removeProduct = async (id) => {
    try {
      await deleteProduct(id);
      setProducts((prev) => prev.filter((p) => p.id !== id)); 
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  const getProduct = async (id) => {
    try {
      return await getProductById(id);
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  return (
    <ProductsContext.Provider
      value={{
        products,
        loading,
        error,
        fetchProducts,
        addProduct,
        editProduct,
        removeProduct,
        getProduct,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};