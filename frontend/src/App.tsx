import {FC} from 'react';
import {AuthContextProvider} from "./context/authContext";
import Router from "./routes";
import {UserContextProvider} from "./context/userContext";
import WebPlayback from "./components/player/WebPlayback";
import './App.scss';

const App: FC = () => {
  return (
    <AuthContextProvider>
      <UserContextProvider>
        <WebPlayback>
          <Router/>
        </WebPlayback>
      </UserContextProvider>
    </AuthContextProvider>
  );
};

export default App;
