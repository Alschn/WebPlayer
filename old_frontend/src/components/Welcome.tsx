import {FC} from "react";
import SpotifyLoginButton from "./SpotifyLoginButton";
import {Navigate} from "react-router-dom";
import useAuth from "../hooks/useAuth";
import {Box} from "@mui/material";

const Welcome: FC = () => {
  const {isAuthenticated} = useAuth();

  if (isAuthenticated) return <Navigate to="/home"/>;

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      bgcolor={"#191414"}
    >
      <Box>
        <SpotifyLoginButton/>
      </Box>
    </Box>
  );
};

export default Welcome;
