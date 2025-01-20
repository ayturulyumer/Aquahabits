import { axiosQuests } from "../api/axios.js";

export const getAll = async () => {
  try {
    const response = await axiosQuests.get();
    return response.data;
  } catch (error) {
    console.error("There was an error with this request:", error);
    throw error;
  }
};
