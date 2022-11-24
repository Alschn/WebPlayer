import {FC} from "react";
import SpotifyLoginButton from "./SpotifyLoginButton";
import {Navigate} from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Welcome: FC = () => {
  const {isAuthenticated} = useAuth();

  if (isAuthenticated) return <Navigate to="/home"/>;

  return (
    <div className="App">
      <header className="App-header">
        <SpotifyLoginButton/>
      </header>
    </div>
  );
};

export default Welcome;
