import AxiosClient from "./axiosClient";

export const loadMoreItems = (url: string, next: string): Promise<any> => {
  return AxiosClient.put(url, {next: next});
};
