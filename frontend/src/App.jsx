import LoginPage from "./page/Auth/Login";
import RegisterPage from "./page/auth/Register.jsx";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Homepage from "./page/user/Home";
import AuthRoute from "./routes/AuthRoutes";
import PrivateRoute from "./routes/PrivateRoutes";
import AccountPage from "./page/user/account";
import "./App.css";
import Dashboard from "./page/admin/dashboard";
import Products from "./page/admin/Products.jsx";
import AdminRoute from "./routes/AdminRoutes.jsx";
import Category from "./page/admin/Category.jsx";
import DetailProduct from "./page/user/DetailProduct.jsx";
import Inventory from "./page/admin/Inventory.jsx";
import AllProducts from "./page/user/AllProducts.jsx";
import Checkout from "./page/user/Checkout.jsx";
import Orders from "./page/user/Orders.jsx";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* AuthRoute */}
          <Route
            path="/login"
            element={
              <AuthRoute>
                <LoginPage />
              </AuthRoute>
            }
          />
          <Route
            path="/Register"
            element={
              <AuthRoute>
                <RegisterPage />
              </AuthRoute>
            }
          />
          {/* AuthRoute */}

          {/* PrivateRoute */}
          <Route
            path="/home"
            element={
              <PrivateRoute>
                <Homepage />
              </PrivateRoute>
            }
          />
          <Route
            path="/account"
            element={
              <PrivateRoute>
                <AccountPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/product/:id"
            element={
              <PrivateRoute>
                <DetailProduct />
              </PrivateRoute>
            }
          />
          <Route
            path="/allproducts"
            element={
              <PrivateRoute>
                <AllProducts />
              </PrivateRoute>
            }
          />

          <Route
            path="/checkout"
            element={
              <PrivateRoute>
                <Checkout />
              </PrivateRoute>
            }
          />

          <Route
            path="/orders"
            element={
              <PrivateRoute>
                <Orders />
              </PrivateRoute>
            }
          />
          {/* PrivateRoute */}

          {/* AdminRoute */}
          <Route
            path="/admin/dashboard"
            element={
              <AdminRoute>
                <Dashboard />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/inventory"
            element={
              <AdminRoute>
                <Inventory />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/products"
            element={
              <AdminRoute>
                <Products />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/categories"
            element={
              <AdminRoute>
                <Category />
              </AdminRoute>
            }
          />
          {/* AdminRoute */}
          <Route path="*" element={<Navigate to="/home" />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
