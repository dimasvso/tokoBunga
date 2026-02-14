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

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
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
            path="/admin/dashboard"
            element={
              <AdminRoute>
                <Dashboard />
              </AdminRoute>
            }
          />

          <Route path="*" element={<Navigate to="/login" />} />
          <Route path="admin/products" element={<Products />} />
          {/* <Route path="*" element={<Navigate to="/login" />} /> */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
