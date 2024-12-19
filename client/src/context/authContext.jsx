import { createContext, useContext, useState, useEffect } from "react";
import * as authApi from "../api/authApi.js"

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null)

  useEffect(() => {
    const storedAccessToken = localStorage.getItem("accessToken")
    if (storedAccessToken) {
      const fetchUserData = async () => {
        try {
          const userData = await authApi.getUserData()
          setUser(userData)
        } catch (err) {
          console.error("Error fetching user data:", err);
        }
      }
      fetchUserData()
    }

  }, [])


  useEffect(() => {
    if (accessToken) {
      localStorage.setItem("accessToken", accessToken)
    }
  }, [accessToken])



  const login = (userData, token) => {
    setUser(userData);
    setAccessToken(token);
  };

  const logout = () => {
    setUser(null)
    setAccessToken(null)
    localStorage.removeItem("accessToken");
  }

  return (
    <AuthContext.Provider
      value={{ user, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
