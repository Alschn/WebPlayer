import {type FC} from 'react';
import {AuthContextProvider} from "./context/AuthContext";
import WebPlayback from "./components/player/WebPlayback";
import Router from "./routing/Router";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

const queryClient = new QueryClient();

const App: FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        {/* @ts-ignore */}
        <WebPlayback>
          <Router/>
        </WebPlayback>
      </AuthContextProvider>
    </QueryClientProvider>
  );
};

export default App;
