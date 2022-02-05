import axios from "axios";
import {API_URL} from "../config";

const AxiosClient = axios.create({
  baseURL: API_URL,
  headers: {'Content-Type': 'application/json'}
});

// before sending request attach auth token
AxiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  config.headers.Authorization = token ? `Token ${token}` : '';
  return config;
});

export default AxiosClient;
