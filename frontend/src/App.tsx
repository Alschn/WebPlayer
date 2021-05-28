import React, {FC, Fragment} from 'react';
import './App.scss';
import {AuthContextProvider} from "./context/authContext";
import Router from "./routes";
import {UserContextProvider} from "./context/userContext";


const App: FC = () => {
  return (
    <Fragment>
      <AuthContextProvider>
        <UserContextProvider>
          <Router/>
        </UserContextProvider>
      </AuthContextProvider>
    </Fragment>
  );
}

export default App;
