// src/context/AuthProvider.jsx
import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

export const AuthContext = createContext();

const API_BASE =
  import.meta.env.VITE_API_URL ||
  "https://asset-verse-server-theta.vercel.app";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // user object
  const [userRole, setUserRole] = useState(null); // "employee" or "hr"
  const [loading, setLoading] = useState(true);

  // =====================
  // Register User (Employee / HR)
  // =====================
  const registerUser = async (email, password, name, role, extra = {}) => {
    setLoading(true);
    try {
      const body = { email, password, name, role, ...extra };
      const res = await axios.post(`${API_BASE}/auth/register`, body);

      const { token, user: userData } = res.data;

      localStorage.setItem("token", token);
      setUser(userData);
      setUserRole(userData.role);
      setLoading(false);

      return userData.role;
    } catch (error) {
      setLoading(false);
      console.error("Register error:", error.response?.data || error.message);
      throw error.response?.data?.error || "Registration failed";
    }
  };

  // =====================
  // Login User
  // =====================
  const loginUser = async (email, password) => {
    setLoading(true);
    try {
      const res = await axios.post(`${API_BASE}/auth/login`, {
        email,
        password,
      });
      const { token, user: userData } = res.data;

      localStorage.setItem("token", token);
      setUser(userData);
      setUserRole(userData.role);
      setLoading(false);

      return userData.role;
    } catch (error) {
      setLoading(false);
      console.error("Login error:", error.response?.data || error.message);
      throw error.response?.data?.error || "Login failed";
    }
  };

  // =====================
  // Logout
  // =====================
  const logoutUser = () => {
    localStorage.removeItem("token");
    setUser(null);
    setUserRole(null);
  };

  
  const fetchCurrentUser = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setUser(null);
      setUserRole(null);
      setLoading(false);
      return;
    }

    try {
      const res = await axios.get(`${API_BASE}/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(res.data.user);
      setUserRole(res.data.user.role);
    } catch (error) {
      console.error(
        "Fetch current user error:",
        error.response?.data || error.message
      );
      logoutUser();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  const authInfo = {
    user,
    userRole,
    loading,
    registerUser,
    loginUser,
    logoutUser,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
