import React, {FC, Fragment, ReactNode, useCallback} from "react";
import {WebPlaybackSDK} from "react-spotify-web-playback-sdk";
import axiosClient from "../../utils/axiosClient";
import useAuth from "../../hooks/useAuth";


interface WebPlaybackProps {
  children: ReactNode;
}

const WebPlayback: FC<WebPlaybackProps> = ({children}) => {
  const {isAuthenticated} = useAuth();

  const fetchSpotifyToken = () => {
    return axiosClient.get(`http://localhost:8000/api/spotify/token`)
      .then(res => res.data.token)
      .catch(err => console.log(err));
  };

  const getOAuthToken = useCallback(callback => {
    const token = fetchSpotifyToken();
    callback(token);
  }, []);

  if (!isAuthenticated) return (
    <Fragment>
      {children}
    </Fragment>
  );

  return (
    <WebPlaybackSDK
      deviceName="Web Player"
      getOAuthToken={getOAuthToken}
      volume={0.3}
      connectOnInitialized
    >
      {children}
    </WebPlaybackSDK>
  );
};

export default WebPlayback;
