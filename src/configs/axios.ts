import { eraseCookie, getCookie } from "@/utils/cookie";
import axios, { InternalAxiosRequestConfig } from "axios";

const axiosInstance = axios.create({
  baseURL: `https://3cee-115-79-61-222.ngrok-free.app/api/v1`,
  timeout: 5000,
  headers: { Accept: "application/json", "Content-Type": "application/json" },
});

axiosInstance.interceptors.request.use(
  function (config) {
    const accessToken = getCookie("accessToken");

    const _config: InternalAxiosRequestConfig<any> = Object.assign(config, {
      headers: {
        ...config.headers,
        Authorization: accessToken ? `Bearer ${accessToken}` : undefined,
      },
    });

    return _config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    console.log(error);
    if (error.response.status === 401) {
      eraseCookie("accessToken");
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
