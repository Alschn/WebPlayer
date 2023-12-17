import { axiosClient } from "./AxiosClient";

export const setPlayerRepeatMode = (
  mode: Spotify.PlaybackState["repeat_mode"],
) => {
  let state;

  switch (mode) {
    case 0:
      state = "off";
      break;
    case 1:
      state = "context";
      break;
    case 2:
      state = "track";
      break;
  }

  return axiosClient.put<unknown>("/api/spotify/me/player/repeat/", {
    state: state,
  });
};

export const setPlayerShuffle = (shuffle: boolean) => {
  return axiosClient.put<unknown>("/api/spotify/me/player/shuffle/", {
    state: shuffle,
  });
};

export const playSong = ({
  uri,
  context_uri,
}: {
  uri?: string;
  context_uri?: string;
}) => {
  const uris = uri ? [uri] : undefined;

  return axiosClient.put<Record<string, never>>("/api/spotify/me/player/play/", {
    uris: uris,
    context_uri,
  });
};
