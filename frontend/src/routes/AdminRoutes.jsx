// routes/AdminRoute.jsx

import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  if (!user) return <Navigate to="/login" />;

  // Cek role lowercase ("admin") dan fallback ke is_admin jika ada
  if (!(user.role === "admin" || user.is_admin)) return <Navigate to="/" />;

  return children;
};

export default AdminRoute;
