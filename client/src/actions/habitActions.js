import { axiosHabits } from "../api/axios.js";

export const getAll = async () => {
  try {
    const response = await axiosHabits.get();
    return response.data;
  } catch (error) {
    console.error("There was an error with this request:", error);
    throw error;
  }
};

// Create a new habit
export const createHabit = async (habitData) => {
  try {
    const response = await axiosHabits.post("/create", habitData); // Provide the correct endpoint path
    return response.data; // Return the created habit data
  } catch (error) {
    console.error(
      "Error creating habit:",
      error?.response?.data || error.message
    );
    throw error;
  }
};

// Edit an existing habit
export const editHabit = async ({ habitId, habitData }) => {
  try {
    const response = await axiosHabits.put(`/${habitId}`, habitData);
    return response.data; // Return the updated habit data
  } catch (error) {
    console.error(
      "Error updating habit:",
      error?.response?.data || error.message
    );
    throw error; // Rethrow the error for further handling
  }
};

// Delete a habit
export const deleteHabit = async (habitId) => {
  try {
    const response = await axiosHabits.delete(`/${habitId}`);
    return response.data;
  } catch (error) {
    console.error(
      "Error deleting habit:",
      error?.response?.data || error.message
    );
    throw error; // Rethrow the error for further handling
  }
};

// Check or uncheck a habit
export const checkInHabit = async (habitId) => {
  try {
    const response = await axiosHabits.post(`/check-in`, { habitId });
    return response.data;
  } catch (error) {
    console.error(
      "Error checking in/unchecking habit:",
      error?.response?.data || error.message
    );
    throw error;
  }
};
