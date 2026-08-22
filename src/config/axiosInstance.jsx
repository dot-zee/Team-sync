import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://team-sync-backend-n78w.onrender.com/api",
  withCredentials: true,
});

// Implementing an automatic token refresh mechanism. It acts as a safety net for expired user sessions.
// Refer to axiosInterceptor.md for better understanding
axiosInstance.interceptors.response.use(
  (response) => response,
  async(error) => {
    const originalReq = error.config;

    if (error.response.status === 401 && !originalReq._retry) {
      originalReq._retry = true;

      try {
        await axiosInstance.get("/auth/get-accessToken")
        return axiosInstance(originalReq)
      } catch (error) {
        window.location.href = "/"
        return Promise.reject(error)
      }
    }
  },
);

