import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import toast from "react-hot-toast";

// Create a new Axios instance
export const axiosApiInstance = axios.create();

// Add a response interceptor
axiosApiInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    // If the response is successful, return it
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & {
      _retry?: boolean; // Flag to prevent repeated requests
    };

    if (!originalRequest) {
      return Promise.reject(error); // If original request is missing, reject
    }

    // No response from server (network error)
    if (!error.response) {
      if (!originalRequest._retry) {
        originalRequest._retry = true; // Set retry flag
        toast.error("Error trying to reconnect to the server"); // Show toast
        return axiosApiInstance(originalRequest); // Retry the request
      }
      toast.error("Server error. Please try again later."); // If retry failed
      return;
    }

    const { status } = error.response;

    // Handle different status codes
    switch (status) {
      case 401:
        if (!originalRequest._retry) {
          toast.error("Unauthorized access!!"); // Unauthorized
        }
        break;
      case 400:
        toast.error("Please try again later."); // Bad request
        break;
      case 403:
        toast.error("Access forbidden!!"); // Forbidden
        break;
      case 404:
        toast.error("Server not found"); // Not found
        break;
      case 406:
        toast.error("Access forbidden!!"); // Not acceptable / forbidden
        break;
      case 500:
        if (!originalRequest._retry) {
          originalRequest._retry = true; // Retry on server error
          return axiosApiInstance(originalRequest);
        }
        toast.error("Internal server error. Please try again later.");
        break;
      default:
        if (status > 500 && !originalRequest._retry) {
          originalRequest._retry = true; // Retry for server errors > 500
          return axiosApiInstance(originalRequest);
        }
        toast.error("Server error. Please try again later.");
        break;
    }

    return Promise.reject(error); // Finally reject the error
  }
);

export default axiosApiInstance;
