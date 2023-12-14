import axios, {AxiosRequestConfig} from "axios";
import {API_URL} from "../config";

export const axiosConfig: AxiosRequestConfig = {
  headers: {'Content-Type': 'application/json'},
  baseURL: API_URL,
};

const AxiosClient = axios.create(axiosConfig);

// before sending request attach auth token
AxiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    config.headers!.Authorization = token ? `Token ${token}` : '';
    return config;
  },
);

export default AxiosClient;
