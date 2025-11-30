// src/context/AuthContext.jsx
import { createContext, useState, useEffect } from "react";
import api from "../api/axios";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);   // { id, username, email }
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Khi reload trang, nếu có token thì gọi /me để lấy user
    const token = localStorage.getItem("lifeup_token");
    if (!token) {
      setLoading(false);
      return;
    }

    api
      .get("/auth/me")
      .then((res) => {
        setUser(res.data.user);
      })
      .catch(() => {
        localStorage.removeItem("lifeup_token");
      })
      .finally(() => setLoading(false));
  }, []);

  const login = async (emailOrUsername, password) => {
    const res = await api.post("/auth/login", { emailOrUsername, password });

    localStorage.setItem("lifeup_token", res.data.token);
    setUser(res.data.user);

    return res.data;
  };

  const register = async (username, email, password) => {
    const res = await api.post("/auth/register", { username, email, password });

    localStorage.setItem("lifeup_token", res.data.token);
    setUser(res.data.user);

    return res.data;
  };

  const logout = () => {
    localStorage.removeItem("lifeup_token");
    setUser(null);
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
