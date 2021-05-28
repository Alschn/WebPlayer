import React, {FC, Fragment} from 'react';
import './App.scss';
import {AuthContextProvider} from "./context/authContext";
import Router from "./routes";


const App: FC = () => {
  return (
    <Fragment>
      <AuthContextProvider>
        <Router/>
      </AuthContextProvider>
    </Fragment>
  );
}

export default App;
