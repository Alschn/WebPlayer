import {FC, useEffect, useState} from "react";
import useQueryParams from "../hooks/useQueryParams";
import useAuth from "../hooks/useAuth";
import {Navigate} from "react-router-dom";
import {getSpotifyAccessToken, loginWithSpotify} from "../api/auth";


const SpotifyCallback: FC = () => {
  const {setToken, isAuthenticated} = useAuth();
  const query = useQueryParams();

  const [code] = useState<string | null>(query.get("code"));
  const [error] = useState<string | null>(query.get("error"));

  const localToken = localStorage.getItem('token');

  // todo - improve this spaghetti code
  useEffect(() => {
    if (code && !localToken) (async () => {
      const token_response = await getSpotifyAccessToken(code);

      const auth_response = await loginWithSpotify({
        access_token: token_response.data.access_token,
        refresh_token: token_response.data.refresh_token,
        expires_in: token_response.data.expires_in,
      });

      const token = auth_response.data.key;
      localStorage.setItem('token', token);
      setToken(token);
    })();
  }, [localToken, code, error, history]);

  if (isAuthenticated) {
    return (
      <Navigate to="/home"/>
    );
  }

  return (
    <div>
      Callback route
      <h1>{code}</h1>
      <h2>{error}</h2>
    </div>
  );
};

export default SpotifyCallback;
