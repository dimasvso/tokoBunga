import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { AuthProvider } from "./context/AuthProvider.jsx";
import { CartProvider } from "./context/CartProvider.jsx";
import { ProductsProvider } from "./context/ProductsProvider.jsx";
import { OrderProvider } from "./context/OrderProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <ProductsProvider>
        <CartProvider>
          <OrderProvider>
            <App />
          </OrderProvider>
        </CartProvider>
      </ProductsProvider>
    </AuthProvider>
  </StrictMode>,
);
