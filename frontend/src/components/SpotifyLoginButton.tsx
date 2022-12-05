import {FC} from "react";
import {getSpotifyAuthUrl} from "../api/auth";
import {Button} from "@mui/material";

const handleSpotifyLogin = () => {
  getSpotifyAuthUrl().then(
    (res) => {
      const {url} = res.data;
      window.location.replace(url);
    }
  ).catch(err => console.error(err));
};


const SpotifyLoginButton: FC = () => {
  return (
    <Button
      onClick={handleSpotifyLogin}
      variant="contained"
      sx={{
        backgroundColor: "#1DB954",
        "&:hover": {
          backgroundColor: "#1DB954",
        }
      }}
    >
      Log in with Spotify
    </Button>
  );
};

export default SpotifyLoginButton;
