import { axiosQuests } from "../api/axios.js";

export const getAllWithUserProgress = async () => {
  try {
    const response = await axiosQuests.get();
    return response.data;
  } catch (error) {
    console.error("There was an error with this request:", error);
    throw error;
  }
};

export const updateQuestProgressForHabit = async (habitId) => {
  try {
    const response = await axiosQuests.post("/update-quest-progress", {
      habitId,
    });
    return response.data;
  } catch (error) {
    console.error("There was an error with this request:", error);
    throw error;
  }
};
