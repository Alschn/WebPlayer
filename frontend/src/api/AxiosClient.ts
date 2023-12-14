import axios, { type AxiosRequestConfig } from "axios";
import { env } from "~/env.mjs";

const axiosConfig = {
  headers: { "Content-Type": "application/json" },
  baseURL: env.NEXT_PUBLIC_API_URL,
} satisfies AxiosRequestConfig;

const axiosClient = axios.create(axiosConfig);

axiosClient.interceptors.request.use((config) => {
  const token = document.cookie
    .split("; ")
    .find((row) => row.startsWith("token"))
    ?.split("=")[1];

  config.headers.Authorization = `Token ${token ?? ""}`;
  return config;
});

export { axiosClient };
