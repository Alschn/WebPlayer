import {FC} from 'react';
import {AuthContextProvider} from "./context/AuthContext";
import {UserContextProvider} from "./context/userContext";
import WebPlayback from "./components/player/WebPlayback";
import Router from "./routing/Router";

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
