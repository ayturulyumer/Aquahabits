import Axios from "axios";
import { responseInterceptor, sessionInterceptor } from "./interceptors.js";

const BASE_URL = import.meta.env.PROD // Checks if it's running in production
  ? import.meta.env.VITE_APP_PRODUCTION_URL
  : import.meta.env.VITE_APP_BASEURL;


export const axios = Axios.create({
  baseURL: `${BASE_URL}/auth/`,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export const axiosHabits = Axios.create({
  baseURL: `${BASE_URL}/habits/`,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export const axiosQuests = Axios.create({
  baseURL: `${BASE_URL}/quests/`,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});
export const axiosCreatures = Axios.create({
  baseURL: `${BASE_URL}/creatures/`,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

sessionInterceptor(axios);
sessionInterceptor(axiosHabits);
sessionInterceptor(axiosQuests);
sessionInterceptor(axiosCreatures);

responseInterceptor(axiosHabits);
responseInterceptor(axiosQuests);
responseInterceptor(axiosCreatures);
