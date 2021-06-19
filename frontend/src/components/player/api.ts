import axiosClient from "../../utils/axiosClient";
import {SpotifyRepeatType} from "../../types/spotify";

export const playSong = (): void => {
  axiosClient.put("http://localhost:8000/api/spotify/play", {}).then(() => {
  }).catch(err => console.log(err));
};

export const pauseSong = (): void => {
  axiosClient.put("http://localhost:8000/api/spotify/play", {}).then(() => {
  }).catch(err => console.log(err));
};

export const skipSong = (forward = true): void => {
  axiosClient.post("http://localhost:8000/api/spotify/skip", {
    forward: forward,
  }).then(() => {
  }).catch(err => console.log(err));
}


export const setRepeatMode = (mode: SpotifyRepeatType): void => {
  axiosClient.put('http://localhost:8000/api/spotify/repeat', {
    mode: mode
  }).then(() => {}).catch(err => console.log(err));
};

export const setShuffle = (shuffle: boolean): void => {
  axiosClient.put('http://localhost:8000/api/spotify/shuffle', {
    shuffle: shuffle
  }).then(() => {}).catch(err => console.log(err));
};
