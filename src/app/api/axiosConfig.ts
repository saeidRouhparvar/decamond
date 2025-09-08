import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import toast from "react-hot-toast";

export const axiosApiInstance = axios.create();

axiosApiInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & {
      _retry?: boolean;
    };

    if (!originalRequest) {
      return Promise.reject(error);
    }

    // No Response (network error)
    if (!error.response) {
      if (!originalRequest._retry) {
        originalRequest._retry = true;
        toast.error("خطا در تلاش برای ارتباط مجدد با سرور");
        return axiosApiInstance(originalRequest);
      }
      toast.error("خطای سرور. لطفاً بعداً دوباره تلاش کنید.");
      return;
    }

    const { status } = error.response;

    switch (status) {
      case 401:
        if (!originalRequest._retry) {
          toast.error("دسترسی غیرمجاز!!");
        }
        break;
      case 400:
        toast.error("لطفاً بعداً دوباره تلاش کنید.");
        break;
      case 403:
        toast.error("دسترسی ممنوع !!.");
        break;
      case 404:
        toast.error("سرور پیدا نشد");
        break;
      case 406:
        toast.error("دسترسی ممنوع !!.");
        break;
      case 500:
        if (!originalRequest._retry) {
          originalRequest._retry = true;
          return axiosApiInstance(originalRequest);
        }
        toast.error("خطای داخلی سرور. لطفاً بعداً دوباره تلاش کنید.");
        break;
      default:
        if (status > 500 && !originalRequest._retry) {
          originalRequest._retry = true;
          return axiosApiInstance(originalRequest);
        }
        toast.error("خطای سرور. لطفاً بعداً دوباره تلاش کنید.");
        break;
    }

    return Promise.reject(error);
  }
);
export default axiosApiInstance;
