import React, {FC, useEffect, useState} from "react";
import {useHistory, useLocation} from "react-router-dom";
import axios from "axios";
import useLocalStorage from "../hooks/useLocalStorage";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const SpotifyCallback: FC = () => {
  let query = useQuery();
  let history = useHistory();

  const [token, setToken] = useLocalStorage('token');

  const [code] = useState<string | null>(query.get("code"));
  const [error] = useState<string | null>(query.get("error"));

  const [receivedSpotifyToken, setReceivedSpotifyToken] = useState<boolean>(false);
  const [receivedAuthToken, setReceivedAuthToken] = useState<boolean>(false);

  useEffect(() => {
    if (code && !token) (async () => {
      const token_response = await axios.post('http://localhost:8000/api/auth/spotify-token', {
        code: code,
      })

      await setReceivedSpotifyToken(true);

      const auth_response = await axios.post('http://localhost:8000/api/auth/spotify-login', {
        access_token: token_response.data.access_token,
        refresh_token: token_response.data.refresh_token,
        expires_in: token_response.data.expires_in,
      })

      await setReceivedAuthToken(true);

      setToken(auth_response.data.key);
      history.push("/home");
    })()
    else {
      history.push("/");
    }
  }, [token, setToken, code, error, history])

  return (
    <div>
      Callback route
      <h1>{code}</h1>
      <h2>{error}</h2>
    </div>
  )
};

export default SpotifyCallback;
