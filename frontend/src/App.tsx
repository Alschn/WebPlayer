import React, {FC, Fragment} from 'react';
import './App.scss';
import AuthContext from "./context/authContext";
import useLocalStorage from "./hooks/useLocalStorage";
import Router from "./routes";


const App: FC = () => {
  const [token] = useLocalStorage('token');

  return (
    <Fragment>
      <AuthContext.Provider value={{
        isAuthenticated: token != null,
        token: token,
      }}>
        <Router/>
      </AuthContext.Provider>
    </Fragment>
  );
}

export default App;
