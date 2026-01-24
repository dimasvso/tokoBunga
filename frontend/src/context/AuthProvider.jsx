import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { GetMe } from "../api/Auth";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const updateUser = (newData) => {
  setUser((prev) => ({
    ...prev,
    ...newData,
  }));
};


  useEffect(() => {
  let mounted = true;

  const initAuth = async () => {
    const token = localStorage.getItem("access");
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const me = await GetMe();
      if (mounted) setUser(me);
    } catch {
      if (mounted) setUser(null);
    } finally {
      if (mounted) setLoading(false);
    }
  };

  initAuth();

  return () => {
    mounted = false;
  };
}, []);


  const login = async (tokenData) => {
    setLoading(true);
    try{
    localStorage.setItem("access", tokenData.access);
    localStorage.setItem("refresh", tokenData.refresh);

    const me = await GetMe();
    setUser(me);
    }
    finally{
    setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};
