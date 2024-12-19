const baseUrl = import.meta.env.VITE_APP_BASEURL;
import * as request from "../lib/requester.js";

export const register = async (name, email, password) => {
  const result = await request.post(`${baseUrl}/users/signup`, {
    name,
    email,
    password,
  });
  return result;
};

export const login = async (email, password) => {
  const result = await request.post(`${baseUrl}/users/login`, {
    email,
    password,
  });

  return result;
};

export const getUserData = async () => {
  const result = await request.get(`${baseUrl}/users/me`);

  return result;
};
