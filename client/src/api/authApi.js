const baseUrl = import.meta.env.VITE_APP_BASEURL;
import * as request from "../lib/requester.js";

export const register = async (email, password) => {
  const result = await request.post(`${baseUrl}/users/signup`, {
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
