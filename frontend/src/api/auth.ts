import AxiosClient from "./AxiosClient";
import {Response} from "./types";

interface SpotifyAccessResponse {
  access_token: string,
  refresh_token: string,
  expires_in: number,
}

export const getSpotifyAccessToken = (code: string): Promise<Response<SpotifyAccessResponse>> => {
  return AxiosClient.post('/auth/spotify/access/', {
    code: code,
  });
};


interface LoginResponse {
  key: string,
}

export const loginWithSpotify = (data: SpotifyAccessResponse): Promise<Response<LoginResponse>> => {
  return AxiosClient.post('/auth/spotify/login/', data);
};
