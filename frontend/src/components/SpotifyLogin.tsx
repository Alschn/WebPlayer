import {FC} from "react";
import axiosClient from "../utils/axiosClient";

const SpotifyLogin: FC = () => {
  const handleSpotifyLogin = () => {
    axiosClient.get('http://localhost:8000/api/spotify-url').then(
      (res) => {
        const {url} = res.data;
        window.location.replace(url);
      }
    ).catch(err => console.error(err));
  };

  return (
    <>
      <button onClick={handleSpotifyLogin}>
        Spotify
      </button>
    </>
  );
};

export default SpotifyLogin;
