import axiosClient from "../../utils/axiosClient";
import {SpotifyRepeatType} from "../../types/spotify";
import AxiosClient from "../../utils/axiosClient";

export const playSong = (): void => {
  axiosClient.put("/spotify/play", {}).then(() => {
  }).catch(err => console.log(err));
};

export const pauseSong = (): void => {
  axiosClient.put("/spotify/pause", {}).then(() => {
  }).catch(err => console.log(err));
};

export const skipSong = (forward = true): void => {
  axiosClient.post("/spotify/skip", {
    forward: forward,
  }).then(() => {
  }).catch(err => console.log(err));
}

export const setRepeatMode = (mode: SpotifyRepeatType): void => {
  axiosClient.put('/spotify/repeat', {
    mode: mode
  }).then(() => {
  }).catch(err => console.log(err));
};

export const setShuffle = (shuffle: boolean): void => {
  axiosClient.put('/spotify/shuffle', {
    shuffle: shuffle
  }).then(() => {
  }).catch(err => console.log(err));
};

export const setVolume = (volume: number): Promise<any> => {
  return axiosClient.put('/spotify/volume', {
    volume: volume
  }).catch(err => console.log(err))
}

export const playSongWithUri = (uri: string, context_uri: string | null | undefined): Promise<any> => {
  return axiosClient.post('/spotify/play', {
    uris: [uri],
    context_uri: context_uri,
  }).catch(err => console.log(err))
};


export const transferPlaybackToDevice = (device_id: string) => {
  return AxiosClient.put('/spotify/devices', {
    device_id: device_id,
  });
};
