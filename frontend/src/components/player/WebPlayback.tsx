import {type PropsWithChildren, useCallback} from "react";
import {WebPlaybackSDK} from "react-spotify-web-playback-sdk";
import useAuth from "../../hooks/useAuth";
import AxiosClient from "../../api/AxiosClient";

type WebPlaybackProps = PropsWithChildren;

type UseGetOAuthToken = () => Spotify.PlayerInit['getOAuthToken'];

function fetchSpotifyToken() {
  return AxiosClient.get<{ token: string }>(`/auth/spotify/token/`);
}

const useGetOAuthToken: UseGetOAuthToken = () => {
  return useCallback(async (callback: (token: string) => void) => {
    try {
      const res = await fetchSpotifyToken();
      callback(res.data.token);
    } catch (e) {
      console.error(e);
    }
  }, []);
};

const PLAYBACK_INITIAL_DEVICE_NAME = 'Web Player';
const PLAYBACK_INITIAL_VOLUME = 0.3;

const WebPlayback = ({children}: WebPlaybackProps) => {
  const {isAuthenticated} = useAuth();

  const getOAuthToken = useGetOAuthToken();

  if (!isAuthenticated) return children;

  return (
    <>
      <WebPlaybackSDK
        initialDeviceName={PLAYBACK_INITIAL_DEVICE_NAME}
        initialVolume={PLAYBACK_INITIAL_VOLUME}
        getOAuthToken={getOAuthToken}
        connectOnInitialized
      />
      {children}
    </>
  );
};

export default WebPlayback;
