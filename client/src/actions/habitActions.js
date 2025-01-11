import { axiosHabits } from "../api/axios.js";

export const getAll = async () => {
  try {
    const response = await axiosHabits.get();
    return response;
  } catch (error) {
    console.error("There was an error with this request:", error);
    throw error;
  }
};
