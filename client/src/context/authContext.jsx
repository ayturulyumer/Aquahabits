import { createContext, useContext, useState, useEffect } from "react";
import { getUserData, refreshSession } from "../actions/authActions.js";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userCoins, setUserCoins] = useState(0)
  const [accessToken, setAccessToken] = useState(null);


  const updateAquaCoins = (aquaCoins) => {
    setUserCoins(aquaCoins)
  }
  
  useEffect(() => {
    const storedAccessToken = localStorage.getItem("accessToken");

    if (storedAccessToken) {
      const fetchUserData = async () => {
        try {
          // Attempt to fetch user data with the current access token
          const userData = await getUserData();
          setUser(userData); // Set user data
        } catch (err) {
          // Check if the error is related to token expiration
          if (err.message === "Access token expired") {
            // Refresh the session if token expired
            try {
              const refreshedAccessToken = await refreshSession();
              setAccessToken(refreshedAccessToken);
              localStorage.setItem("accessToken", refreshedAccessToken); // Store the new token

              // Retry fetching user data with the new access token
              const userData = await getUserData();
              setUser(userData);
            } catch (refreshError) {
              console.error("Error refreshing session:", refreshError.message);
              // Optionally, log out or redirect to login page
            }
          } else {
            console.error("Error fetching user data:", err);
          }
        }
      };

      fetchUserData(); // Fetch user data when the component mounts
    }
  }, []); // The empty dependency array ensures this runs only on component mount

  useEffect(() => {
    // Whenever accessToken is updated, store it in localStorage
    if (accessToken) {
      localStorage.setItem("accessToken", accessToken);
    }
  }, [accessToken]);

  const login = (userData, token) => {
    setUser(userData);
    setAccessToken(token);
  };

  const logout = () => {
    setUser(null);
    setAccessToken(null);
    localStorage.removeItem("accessToken");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, updateAquaCoins, userCoins }}>
      {children}
    </AuthContext.Provider>
  );
};
