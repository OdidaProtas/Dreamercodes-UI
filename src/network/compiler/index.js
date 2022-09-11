import axios from "axios";
import endpoints from "../endpoints";

const baseURL = endpoints.BASE_URLS.compiler;

const axiosInstance = axios.create({
  baseURL,
  timeout: 50000,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("access_token");
    if (Boolean(accessToken))
      config.headers.common["access_token"] = `Bearer ${accessToken}`;
    return config;
  },
  (error) => {
    console.error(error);
  }
);

export const compilerAxiosInstance = axiosInstance;
