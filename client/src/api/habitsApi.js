const baseUrl = import.meta.env.VITE_APP_BASEURL;
import * as request from "../lib/requester.js";

export const getAll = async () => {
  const result = await request.get(`${baseUrl}/habits`);
  return result;
};
