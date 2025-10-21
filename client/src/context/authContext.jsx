import { createContext, useContext, useState, useEffect } from "react";
import { getUserData, refreshSession } from "../actions/authActions.js";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);





  const updateAquaCoins = (updatedCoins) => {
    setUser((prevUser) => ({ ...prevUser, aquaCoins: updatedCoins }))
  }

  const updateUserCreatures = (newCreature) => {
    setUser((prevUser) => ({
      ...prevUser, // Keep all previous user properties
      creatures: [...prevUser.creatures, newCreature], // Append new creature
    }));
  };

  const removeUserCreature = (creatureId) => {
    setUser((prevUser) => ({
      ...prevUser,
      creatures: prevUser.creatures.filter((creature) => creature._id !== creatureId),
    }));
  };






  const updateUserQuestProgress = (updatedQuestProgress) => {
    if (updatedQuestProgress) {
      setUser((prevUser) => {
        const updatedProgress = prevUser.questProgress.map((questProgress) => {
          if (questProgress.questId === updatedQuestProgress.questId) {
            // If quest progress exists, update it
            return {
              ...questProgress,  // Keep existing progress
              ...updatedQuestProgress,  // Overwrite with the new progress data
            };
          }
          return questProgress;  // Return the other quests unchanged
        });

        // If no matching questId was found, add the new progress
        if (!prevUser.questProgress.some((quest) => quest.questId === updatedQuestProgress.questId)) {
          updatedProgress.push(updatedQuestProgress);
        }

        // Return the updated user state with updated questProgress
        return { ...prevUser, questProgress: updatedProgress };
      });
    }
  };


  useEffect(() => {
    const storedAccessToken = localStorage.getItem("accessToken");

    if (!storedAccessToken) {
      setIsLoading(false);
      return;
    }

    const fetchUserData = async () => {
      try {
        const userData = await getUserData();
        setUser(userData);
      } catch (err) {
        if (err.message === "Access token expired") {
          try {
            const refreshedAccessToken = await refreshSession();
            setAccessToken(refreshedAccessToken);
            localStorage.setItem("accessToken", refreshedAccessToken);
            const userData = await getUserData();
            setUser(userData);
          } catch (refreshError) {
            console.error("Error refreshing session:", refreshError.message);
          }
        } else {
          console.error("Error fetching user data:", err);
        }
      } finally {
        setIsLoading(false); // done fetching
      }
    };

    fetchUserData();
  }, []);
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

  const removeUserState = () => {
    setUser(null);
    setAccessToken(null);
    localStorage.removeItem("accessToken");
  };

  return (
    <AuthContext.Provider value={{ user, login, removeUserState, updateAquaCoins, updateUserQuestProgress, updateUserCreatures, removeUserCreature ,isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
