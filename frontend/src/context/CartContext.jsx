// import { createContext, useContext, useEffect, useState } from "react";
// import {
//   getCart,
//   addToCart,
//   removeFromCart,
//   updateCartItem,
// } from "../api/cart";

// const CartContext = createContext();

// export function useCart() {
//   return useContext(CartContext);
// }

// export function CartProvider({ children }) {
//   const [cart, setCart] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const fetchCart = async () => {
//     setLoading(true);
//     try {
//       const data = await getCart();
//       setCart(data);
//     } catch (e) {
//       setCart(null);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchCart();
//   }, []);

//   const add = async (product, quantity = 1) => {
//     await addToCart(product, quantity);
//     fetchCart();
//   };
//   const remove = async (product) => {
//     await removeFromCart(product);
//     fetchCart();
//   };
//   const update = async (product, quantity) => {
//     await updateCartItem(product, quantity);
//     fetchCart();
//   };

//   return (
//     <CartContext.Provider
//       value={{ cart, loading, add, remove, update, refetch: fetchCart }}
//     >
//       {children}
//     </CartContext.Provider>
//   );
// }
