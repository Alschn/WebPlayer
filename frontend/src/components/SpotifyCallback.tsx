import {FC, useEffect, useState} from "react";
import {Redirect, useHistory} from "react-router-dom";
import useQuery from "../hooks/useQuery";
import axiosClient from "../utils/axiosClient";

type redirectType = 'CB_SUCCESS' | 'CB_FAILURE' | null;

const setToken = (tokenValue: string): void => localStorage.setItem('token', tokenValue);

const SpotifyCallback: FC = () => {
  let query = useQuery();
  let history = useHistory();

  const [code] = useState<string | null>(query.get("code"));
  const [error] = useState<string | null>(query.get("error"));

  const [redirectState, setRedirectState] = useState<redirectType>(null);

  const token = localStorage.getItem('token');

  useEffect(() => {
    if (code && !token) (async () => {
      const token_response = await axiosClient.post('/auth/spotify-token', {
        code: code,
      });

      const auth_response = await axiosClient.post('/auth/login', {
        access_token: token_response.data.access_token,
        refresh_token: token_response.data.refresh_token,
        expires_in: token_response.data.expires_in,
      });

      setToken(auth_response.data.key);
      setRedirectState('CB_SUCCESS');
    })();
    else {
      setRedirectState('CB_FAILURE');
    }
    return () => setRedirectState(null);
  }, [token, code, error, history]);

  if (redirectState === 'CB_SUCCESS') {
    return (<Redirect to={{
      pathname: "/",
      state: {authenticated: true}
    }}/>);
  } else if (redirectState === 'CB_FAILURE') {
    return (<Redirect to={{
      pathname: "/",
      state: {authenticated: false}
    }}/>);
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
