import AxiosClient from "./axiosClient";

export const createNewPlaylist = (user_id: string, playlist_name: string | null = null): Promise<any> => {
  return AxiosClient.post(`http://localhost:8000/api/spotify/users/${user_id}/playlists`, {
    name: playlist_name != null ? playlist_name : `New playlist by ${user_id}`
  });
}

export const loadMoreItems = (url: string, next: string): Promise<any> => {
  return AxiosClient.put(url, {next: next});
};

export const performLogout = (): Promise<any> => {
  return AxiosClient.post('http://localhost:8000/api/auth/logout', {});
};
