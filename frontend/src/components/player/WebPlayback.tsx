import {FC, Fragment, ReactNode, useCallback} from "react";
import {WebPlaybackSDK} from "react-spotify-web-playback-sdk";
import axiosClient from "../../utils/axiosClient";
import useAuth from "../../hooks/useAuth";


interface WebPlaybackProps {
  children: ReactNode;
}

const fetchSpotifyToken = () => {
  return axiosClient.get(`/spotify/token`)
    .then(res => res.data.token)
    .catch(err => console.log(err));
};

const WebPlayback: FC<WebPlaybackProps> = ({children}) => {
  const {isAuthenticated} = useAuth();

  const getOAuthToken: Spotify.PlayerInit['getOAuthToken'] = useCallback((callback: (token: any) => void) => {
    const token = fetchSpotifyToken();
    callback(token);
  }, []);

  if (!isAuthenticated) return (
    <Fragment>
      {children}
    </Fragment>
  );

  return (
    // something is wrong with web playback sdk
    <WebPlaybackSDK
      initialDeviceName={"Web Player"}
      getOAuthToken={getOAuthToken}
      initialVolume={0.3}
      connectOnInitialized
    >
      {children}
    </WebPlaybackSDK>
  );
};

export default WebPlayback;
