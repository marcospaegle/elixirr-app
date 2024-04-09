"use client";

import axios from "axios";

let token = "";

const axiosInstance = axios.create({
  baseURL: "http://localhost/api/v1/",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

axiosInstance.interceptors.request.use(
  function (config) {
    if (token !== "") {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export const setBearerToken = (t) => {
  token = t;
};

export default axiosInstance;
