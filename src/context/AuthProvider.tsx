import { useState, useEffect, type ReactNode } from "react";
import { type AuthContextType, type User } from "../types/auth";
import { AuthContext } from "./AuthContext";

interface AuthProviderProps {
  children: ReactNode;
}
const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState(() => {
    try {
      const storeUser = localStorage.getItem("user");
      return storeUser ? JSON.parse(storeUser) : null;
    } catch {
      return null;
    }
  });

  const [token, setToken] = useState(() => localStorage.getItem("accessToken"));
  const [isLoading, setIsLoading] = useState(true);

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
  };

  useEffect(() => {
    const initAuth = async () => {
      setIsLoading(false);
    };

    initAuth();
  }, []);

  const login = (newToken: string, userData: User) => {
    localStorage.setItem("accessToken", newToken);
    localStorage.setItem("user", JSON.stringify(userData));
    setToken(newToken);
    setUser(userData);
  };

  const value: AuthContextType = {
    user,
    token,
    isAuthenticated: !!token,
    isLoading,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
