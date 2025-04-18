import { useState } from "react";
import { login, logout, signup } from "../api/auth";

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

  const handleSignup = async (first_name: string, last_name: string, username: string, password: string) => {
    try {
      await signup(first_name,
        last_name,
        username,
        password,);
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

  return { isAuthenticated, handleSignup, handleLogin, handleLogout };
};
