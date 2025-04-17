import { useState } from "react";
import { login, logout } from "../api/auth";

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("access_token"));

  const handleLogin = async (username: string, password: string) => {
    try {
      await login(username, password);
      setIsAuthenticated(true);
      
    } catch (error) {
      console.error("Login failed", error);
      throw error;
    }
  };

  const handleLogout = () => {
    logout();
    setIsAuthenticated(false);
  };

  return { isAuthenticated, handleLogin, handleLogout };
};
