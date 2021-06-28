import AxiosClient from "./axiosClient";

export const loadMoreItems = (url: string, next: string): Promise<any> => {
  return AxiosClient.put(url, {next: next});
};

export const performLogout = (): Promise<any> => {
  return AxiosClient.post('http://localhost:8000/api/auth/logout', {})
};
