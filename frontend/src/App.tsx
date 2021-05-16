import React, {FC} from 'react';
import logo from './logo.svg';
import './App.scss';
import SpotifyCallback from "./components/SpotifyCallback";
import SpotifyLogin from "./components/SpotifyLogin";
import {BrowserRouter, Route} from "react-router-dom";


const App: FC = () => {
  return (
    <div>
      <BrowserRouter>
        <Route path="/callback" component={SpotifyCallback}/>

        <Route exact path="/">
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
        </Route>
      </BrowserRouter>
    </div>


  );
}

export default App;
