import {FC} from "react";
import AxiosClient from "../api/AxiosClient";

const handleSpotifyLogin = () => {
  AxiosClient.get('/spotify/url/').then(
    (res) => {
      const {url} = res.data;
      window.location.replace(url);
    }
  ).catch(err => console.error(err));
};

const SpotifyLoginButton: FC = () => {
  return (
    <button onClick={handleSpotifyLogin}>
      Spotify
    </button>
  );
};

export default SpotifyLoginButton;
