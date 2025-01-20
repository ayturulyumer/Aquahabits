import Axios from "axios";
import { responseInterceptor, sessionInterceptor } from "./interceptors.js";

const BASE_URL = `${import.meta.env.VITE_APP_BASEURL}`;

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

sessionInterceptor(axios);
sessionInterceptor(axiosHabits);
sessionInterceptor(axiosQuests);
responseInterceptor(axiosHabits);
responseInterceptor(axiosQuests);
