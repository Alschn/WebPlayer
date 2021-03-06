import AxiosClient from "./axiosClient";

interface EditPlaylistDataType {
  name?: string,
  public?: boolean,
  collaborative?: boolean,
  description?: string,
}

type ArtistEndpointType = 'tracks' | 'albums' | 'related-artists' | '';

export const createNewPlaylist = (user_id: string, playlist_name: string | null = null): Promise<any> => {
  return AxiosClient.post(`http://localhost:8000/api/spotify/users/${user_id}/playlists`, {
    name: playlist_name != null ? playlist_name : `New playlist by ${user_id}`
  });
};

export const editPlaylist = (playlist_id: string, data: EditPlaylistDataType): Promise<any> => {
  return AxiosClient.patch(`http://localhost:8000/api/spotify/playlists/${playlist_id}`, {
    ...data
  });
};

export const loadMoreItems = (url: string, next: string): Promise<any> => {
  return AxiosClient.put(url, {next: next});
};

export const performLogout = (): Promise<any> => {
  return AxiosClient.post('http://localhost:8000/api/auth/logout', {});
};

export const getArtistData = (artistId: string, endpoint: ArtistEndpointType = ""): Promise<any> => {
  let url = `http://localhost:8000/api/spotify/artists/${artistId}`;
  if (endpoint) url += `/${endpoint}`;
  return AxiosClient.get(url);
};
