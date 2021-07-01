import React, {FC} from "react";
import logo from "../logo.svg";
import SpotifyLogin from "./SpotifyLogin";
import {Redirect, useLocation} from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Welcome: FC = () => {
  const {isAuthenticated} = useAuth();

  let location = useLocation();
  // @ts-ignore
  const redirectedWithAuth = location.state !== undefined && location.state.authenticated

  if (isAuthenticated || redirectedWithAuth) return <Redirect to="/home"/>;

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo"/>
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>

        <SpotifyLogin/>
      </header>
    </div>
  )
}

export default Welcome;
