import {SpotifyRepeatType} from "../../types/spotify";
import AxiosClient from "../../api/AxiosClient";
import {Response} from "../../api/types";

export const playSong = (): Promise<Response<any>> => {
  return AxiosClient.put("/spotify/player/play/", {});
};

export const pauseSong = (): Promise<Response<any>> => {
  return AxiosClient.put("/spotify/player/pause/", {});
};

export const skipSong = (forward = true): Promise<Response<any>> => {
  return AxiosClient.post("/spotify/player/skip/", {
    forward: forward,
  });
};

export const setRepeatMode = (mode: SpotifyRepeatType): Promise<Response<any>> => {
  return AxiosClient.put('/spotify/player/repeat/', {
    mode: mode
  });
};

export const setShuffle = (shuffle: boolean): Promise<Response<any>> => {
  return AxiosClient.put('/spotify/player/shuffle/', {
    shuffle: shuffle
  });
};

export const setVolume = (volume: number): Promise<Response<any>> => {
  return AxiosClient.put('/spotify/player/volume/', {
    volume: volume
  });
};

export const playSongWithUri = (uri: string, context_uri: string | null | undefined): Promise<Response<any>> => {
  return AxiosClient.post('/spotify/player/play/', {
    uris: [uri],
    context_uri: context_uri,
  });
};

export const transferPlaybackToDevice = (device_id: string): Promise<Response<any>> => {
  return AxiosClient.put('/spotify/devices/', {
    device_id: device_id,
  });
};
