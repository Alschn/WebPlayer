import AxiosClient from "./AxiosClient";

interface SpotifyUrlResponse {
  url: string;
}

export const getSpotifyAuthUrl = () => {
  return AxiosClient.get<SpotifyUrlResponse>('/auth/spotify/url/');
};

interface SpotifyAccessResponse {
  access_token: string,
  refresh_token: string,
  expires_in: number,
}

export const getSpotifyAccessToken = (code: string) => {
  return AxiosClient.post<SpotifyAccessResponse>('/auth/spotify/access/', {
    code: code,
  });
};


interface LoginResponse {
  key: string,
}

export const loginWithSpotify = (data: SpotifyAccessResponse) => {
  return AxiosClient.post<LoginResponse>('/auth/spotify/login/', data);
};
