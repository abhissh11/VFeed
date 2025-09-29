import { createContext, useContext, useEffect, useState } from "react";
import socket from "../utils/socket";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem("user");
      if (!stored || stored === "undefined") return null;
      return JSON.parse(stored);
    } catch (err) {
      console.error("Failed to parse user from localStorage:", err);
      return null;
    }
  });

  const login = (data) => {
    setUser(data.user);
    localStorage.setItem("user", JSON.stringify(data.user));
    localStorage.setItem("token", data.token);
    socket.emit("register", userData.user._id);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  useEffect(() => {
    if (user?._id) {
      socket.emit("register", user._id);
    }
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
