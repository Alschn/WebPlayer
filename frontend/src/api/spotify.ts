import AxiosClient from "./AxiosClient";
import {Response} from "./types";

export const getDevices = (): Promise<Response<any>> => {
  return AxiosClient.get('/spotify/devices/');
};


interface EditPlaylistDataType {
  name?: string,
  public?: boolean,
  collaborative?: boolean,
  description?: string,
}

type ArtistEndpointType = 'tracks' | 'albums' | 'related-artists' | '';

export const createNewPlaylist = (user_id: string, playlist_name: string | null = null): Promise<Response<any>> => {
  return AxiosClient.post(`/spotify/users/${user_id}/playlists/`, {
    name: playlist_name != null ? playlist_name : `New playlist by ${user_id}`
  });
};

export const editPlaylist = (playlist_id: string, data: EditPlaylistDataType): Promise<Response<any>> => {
  return AxiosClient.patch(`/spotify/playlists/${playlist_id}/`, {
    ...data
  });
};

export const loadMoreItems = (url: string, next: string): Promise<Response<any>> => {
  return AxiosClient.put(url, {next: next});
};

export const performLogout = (): Promise<Response<any>> => {
  return AxiosClient.post('/auth/logout/', {});
};

export const getArtistData = (artistId: string, endpoint: ArtistEndpointType = ""): Promise<Response<any>> => {
  let url = `/spotify/artists/${artistId}/`;
  if (endpoint) url += `${endpoint}/`;
  return AxiosClient.get(url);
};

export const getPlaylists = (): Promise<Response<any>> => {
  return AxiosClient.get('/spotify/playlists/');
};
