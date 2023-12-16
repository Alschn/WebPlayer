"use client";

import { useCallback, type ReactNode } from "react";
import { WebPlaybackSDK } from "react-spotify-web-playback-sdk";
import { axiosClient } from "~/api/AxiosClient";

function getCurrentSpotifyToken() {
  return axiosClient.get<{ token: string }>(`/api/auth/spotify/token/`);
}

const useGetOAuthToken = () => {
  return useCallback(async (callback: (token: string) => void) => {
    try {
      const res = await getCurrentSpotifyToken();
      callback(res.data.token);
    } catch (e) {
      console.error(e);
    }
  }, []);
};

const PLAYBACK_INITIAL_DEVICE_NAME = "Web Player";
const PLAYBACK_INITIAL_VOLUME = 0.3;

export default function WebPlaybackProvider({
  children,
}: {
  children: ReactNode;
}) {
  const getOAuthToken = useGetOAuthToken();

  return (
    <WebPlaybackSDK
      initialDeviceName={PLAYBACK_INITIAL_DEVICE_NAME}
      initialVolume={PLAYBACK_INITIAL_VOLUME}
      getOAuthToken={getOAuthToken}
      connectOnInitialized
    >
      {children}
    </WebPlaybackSDK>
  );
}
