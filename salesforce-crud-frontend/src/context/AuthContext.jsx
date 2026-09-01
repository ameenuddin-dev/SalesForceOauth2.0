import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

import { authApi } from "../services/authApi";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(true);

  const checkAuth = useCallback(async () => {
    try {
      setLoading(true);

      const response = await authApi.me();

      console.log("ME API RESPONSE:", response);

      if (response?.authenticated) {
        setUser(response.user);
        return true;
      }

      setUser(null);
      return false;
    } catch (error) {
      console.log("NOT AUTHENTICATED:", error.response?.data || error.message);

      setUser(null);

      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const logout = async () => {
    try {
      await authApi.logout();

      console.log("Backend logout successful");
    } catch (error) {
      console.error("LOGOUT ERROR:", error.response?.data || error.message);
    } finally {
      // Always clear React authentication state
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        checkAuth,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
};
