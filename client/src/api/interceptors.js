import { axios } from "./axios.js";
// Interceptor to attach the Authorization token before each request
export const sessionInterceptor = (axiosInstance) =>
  axiosInstance.interceptors.request.use(
    (config) => {
      const accessToken = localStorage.getItem("accessToken");

      if (accessToken) {
        config.headers["Authorization"] = `Bearer ${accessToken}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

// interceptor to refresh session
export const responseInterceptor = (axiosInstance) => {
  axiosInstance.interceptors.response.use(
    (response) => response, // If the response is OK, return it
    async (error) => {
      const originalRequest = error.config; // Get the original request

      // If the error is a 401 and we haven't attempted to refresh yet
      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true; // Flag to prevent infinite loops

        // Try refreshing the token
        try {
          const refreshResponse = await axios.post("/refresh-session");

          // Get the new access token from the response
          const newAccessToken = refreshResponse.data;

          // Save the new access token
          localStorage.setItem("accessToken", newAccessToken);

          // Update the Authorization header with the new access token
          originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;

          // Retry the original request with the new token
          return axiosInstance(originalRequest); // Retry the request
        } catch (refreshError) {
          console.error("Token refresh failed:", refreshError);
          // Optionally: Redirect to login or clear the session
          //   localStorage.removeItem("accessToken");
          //   window.location.href = "/login"; // Redirect to login page
          return Promise.reject(refreshError);
        }
      }

      // If the error is not a 401 or refresh failed, reject the promise
      return Promise.reject(error);
    }
  );
};
