import axios from "axios";
import useAxios from "./hooks/useAxios";

import * as ENDPOINTS from "./endpoints";

const baseURL = ENDPOINTS.BASE_URL;

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
    console.log(error);
  }
);

export { axiosInstance, useAxios, ENDPOINTS };
