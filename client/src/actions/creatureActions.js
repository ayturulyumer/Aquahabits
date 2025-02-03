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

// Creatures are added in users aquarium / that's the reason i'm  using user actions here
export const addCreature = async (creature) => {
  try {
    const response = await axiosCreatures.post("/add-creature", creature);
    return response.data;
  } catch (error) {
    console.error("There was an error with this request:", error);
    throw error;
  }
};

export const removeCreature = async ({ creatureModelId, userCreatureId }) => {
  try {
    const response = await axiosCreatures.post("/remove-creature", {
      creatureModelId,
      userCreatureId,
    });
    return response.data;
  } catch (error) {
    console.error("There was an error with this request:", error);
    throw error;
  }
};

export const levelUpCreature = async ({ creatureModelId, userCreatureId }) => {
  try {
    const response = await axiosCreatures.patch("/levelup-creature", {
      creatureModelId,
      userCreatureId,
    });
    return response.data;
  } catch (error) {
    console.error("There was an error with this request:", error);
    throw error;
  }
};
