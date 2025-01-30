import { axiosCreatures } from "../api/axios.js";

export const getAll = async () => {
  try {
    const response = await axiosCreatures.get("/");
    return response.data;
  } catch (error) {
    console.error("There was an error with this request:", error);
    throw error;
  }
};
