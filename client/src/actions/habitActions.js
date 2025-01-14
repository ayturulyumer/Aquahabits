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

// Update an existing habit
export const updateHabit = async (habitId, habitData) => {
  try {
    const response = await axiosHabits.patch(`/edit/${habitId}`, habitData); // Send habit ID in the path
    return response.data; 
  } catch (error) {
    console.error(
      "Error updating habit:",
      error?.response?.data || error.message
    );
    throw error;
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
