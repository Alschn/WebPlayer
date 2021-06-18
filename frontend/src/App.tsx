import React, {FC, Fragment} from 'react';
import './App.scss';
import {AuthContextProvider} from "./context/authContext";
import Router from "./routes";
import {UserContextProvider} from "./context/userContext";
import WebPlayback from "./components/player/WebPlayback";


const App: FC = () => {
  return (
    <Fragment>
      <AuthContextProvider>
        <UserContextProvider>
          <WebPlayback>
            <Router/>
          </WebPlayback>
        </UserContextProvider>
      </AuthContextProvider>
    </Fragment>
  );
}

export default App;
