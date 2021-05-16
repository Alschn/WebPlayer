import React, {FC} from "react";
import axios from "axios";

const SpotifyLogin: FC = () => {
  const handleSpotifyLogin = () => {
    axios.get('http://localhost:8000/api/spotify-url').then(
      (res) => {
        const {url} = res.data;
        window.location.replace(url);
      }
    ).catch(err => console.error(err));
  }

  return (
    <>
      <button onClick={handleSpotifyLogin}>
        Spotify
      </button>
    </>
  )
};

export default SpotifyLogin;
