import AxiosClient from "./AxiosClient";
import type {Response} from "./types";
import type {SpotifyRepeatType} from "../types/spotify";


export const getDevices = () => {
  return AxiosClient.get<any>('/spotify/me/player/devices/');
};

interface EditPlaylistDataType {
  name?: string,
  public?: boolean,
  collaborative?: boolean,
  description?: string,
}

export const createNewPlaylist = (user_id: string, playlist_name: string | null = null) => {
  const name = playlist_name ?? `New playlist by ${user_id}`;

  return AxiosClient.post<any>(`/spotify/users/${user_id}/playlists/`, {
    name: name
  });
};

export const editPlaylist = (playlist_id: string, data: EditPlaylistDataType) => {
  return AxiosClient.patch<any>(`/spotify/playlists/${playlist_id}/`, {
    ...data
  });
};


export const getArtist = (artistId: string) => {
  return AxiosClient.get<any>(`/spotify/artists/${artistId}/`);
};

export const getArtistAlbums = (artistId: string) => {
  return AxiosClient.get<any>(`/spotify/artists/${artistId}/albums/`);
};

export const getArtistTopTracks = (artistId: string) => {
  return AxiosClient.get<any>(`/spotify/artists/${artistId}/top-tracks/`, {
    params: {
      market: 'US'
    }
  });
};

export const getArtistRelatedArtists = (artistId: string) => {
  return AxiosClient.get<any>(`/spotify/artists/${artistId}/related-artists/`);
};

interface MePlaylistsParams {
  limit?: number | null,
  offset?: number | null,
}

export const getMyPlaylists = (params?: MePlaylistsParams) => {
  return AxiosClient.get<any>('/spotify/me/playlists/', {
    params
  });
};

export interface SavedTracksParams {
  limit?: number | string | null,
  offset?: number | string | null,
  market?: string | null,
}

export interface SavedTrack {
  added_at: string,
  // todo: add track type
  track: any,
}

export interface SavedTracks {
  href: string,
  items: SavedTrack[],
  next: string,
  previous: string,
  offset: number,
  total: number,
}

export const getSavedTracks = (params?: SavedTracksParams) => {
  return AxiosClient.get<SavedTracks>(`/spotify/me/tracks/`, {
    params: params
  });
};

export const getCurrentUser = () => {
  return AxiosClient.get('/spotify/me/');
};

export const getAlbum = (albumId: string) => {
  return AxiosClient.get(`/spotify/albums/${albumId}/`);
};

export const getAlbumTracks = (albumId: string, params?: any) => {
  return AxiosClient.get(`/spotify/albums/${albumId}/tracks/`, {
    params: params
  });
};

export const getAlbums = (albumIds: string[]) => {
  return AxiosClient.get(`/spotify/albums/`, {
    params: {
      ids: albumIds.join(',')
    }
  });
};

export const getUser = (user_id: string) => {
  return AxiosClient.get(`/spotify/users/${user_id}/`);
};

export const getUserPlaylists = (user_id: string) => {
  return AxiosClient.get(`/spotify/users/${user_id}/playlists/`);
};

export const getCurrentUserSavedAlbums = (user_id: string) => {
  return AxiosClient.get(`/spotify/me/albums/`);
};

export const getCurrentUserTopArtists = (user_id: string) => {
  return AxiosClient.get(`/spotify/me/top/artists/`);
};

export const getCurrentUserTopTracks = (user_id: string) => {
  return AxiosClient.get(`/spotify/me/top/tracks/`);
};

export const getPlaylist = (playlist_id: string) => {
  return AxiosClient.get(`/spotify/playlists/${playlist_id}/`);
};

export const getPlaylists = (playlist_ids: string[]) => {
  return AxiosClient.get(`/spotify/playlists/`, {
    params: {
      ids: playlist_ids.join(',')
    }
  });
};

interface LimitOffsetPaginationParams {
  limit?: number | null,
  offset?: number | null,
}

export const getPlaylistTracks = (playlist_id: string, params?: LimitOffsetPaginationParams) => {
  return AxiosClient.get<any>(`/spotify/playlists/${playlist_id}/tracks/`, {
    params: params
  });
};

export const performLogout = () => {
  return AxiosClient.post<Record<string, never>>('/auth/logout/', {});
};

export const playSong = () => {
  return AxiosClient.put<unknown>("/spotify/me/player/play/", {});
};

export const pauseSong = () => {
  return AxiosClient.put<unknown>("/spotify/me/player/pause/", {});
};

export const skipSong = (forward = true) => {
  return AxiosClient.post<unknown>("/spotify/me/player/skip/", {
    forward: forward,
  });
};

export const setRepeatMode = (mode: SpotifyRepeatType) => {
  return AxiosClient.put<unknown>('/spotify/me/player/repeat/', {
    mode: mode
  });
};

export const setShuffle = (shuffle: boolean) => {
  return AxiosClient.put<unknown>('/spotify/me/player/shuffle/', {
    shuffle: shuffle
  });
};

export const setVolume = (volume: number) => {
  return AxiosClient.put<unknown>('/spotify/me/player/volume/', {
    volume: volume
  });
};

export const playSongWithUri = (
  uri?: string | null,
  context_uri?: string | null
): Promise<Response<any>> => {
  let uris;
  if (uri) {
    uris = [uri];
  }
  return AxiosClient.post<unknown>('/spotify/me/player/play/', {
    uris: uris,
    context_uri: context_uri,
  });
};

export const transferPlaybackToDevice = (device_id: string) => {
  return AxiosClient.put<unknown>('/spotify/me/player/devices/', {
    device_id: device_id,
  });
};
