import { createContext, useContext, useMemo, useState } from "react";
import {
  clearStoredAuth,
  loadStoredAuth,
  storeAuth
} from "../../shared/utils/tokenStorage";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const initial = loadStoredAuth();
  const [token, setToken] = useState(initial.token);
  const [user, setUser] = useState(initial.user);

  const login = (nextToken, nextUser) => {
    setToken(nextToken);
    setUser(nextUser);
    storeAuth(nextToken, nextUser);
  };

  const logout = () => {
    setToken("");
    setUser(null);
    clearStoredAuth();
  };

  const updateUser = (partialUser) => {
    const merged = { ...(user || {}), ...(partialUser || {}) };
    setUser(merged);
    storeAuth(token, merged);
  };

  const value = useMemo(
    () => ({ token, user, login, logout, updateUser }),
    [token, user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuthStore() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthStore must be used within AuthProvider");
  }
  return context;
}
