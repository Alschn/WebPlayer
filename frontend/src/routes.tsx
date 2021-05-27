import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import SpotifyCallback from "./components/SpotifyCallback";
import React, {ComponentType, FC, useContext} from "react";
import AuthContext from "./context/authContext";
import Welcome from "./components/Welcome";
import Home from "./components/main/Home";
import Profile from "./components/main/Profile";
import PageNotFound from "./components/PageNotFound";
import SpotifyLayout from "./components/layout/SpotifyLayout";
import Playlist from "./components/main/Playlist";

interface PrivateRouteProps {
  component: ComponentType,
  path: string,
  exact?: boolean,
}

const PrivateRoute = ({component: Component, path}: PrivateRouteProps) => {
  const {isAuthenticated} = useContext(AuthContext);

  return isAuthenticated ? (
    <Route path={path} exact>
      <SpotifyLayout>
        <Component/>
      </SpotifyLayout>
    </Route>
  ) : (
    <Redirect
      to="/"
    />
  )
};


const Router: FC = () => {
  const {isAuthenticated} = useContext(AuthContext);

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/callback" component={SpotifyCallback}/>

        <PrivateRoute path="/home" component={Home}/>
        <PrivateRoute path="/profile" component={Profile}/>
        <PrivateRoute path="/playlists/:id" component={Playlist}/>

        <Route exact path="/" render={
          () => (isAuthenticated ? <Redirect to="/home"/> : <Welcome/>)
        }/>

        <Route path="*" component={PageNotFound}/>
      </Switch>
    </BrowserRouter>
  )
};

export default Router;
