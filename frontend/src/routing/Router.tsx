import {FC} from "react";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import SpotifyLayout from "../components/layout/SpotifyLayout";
import Welcome from "../components/Welcome";
import Artist from "../components/main/Artist";
import Playlist from "../components/main/Playlist";
import ArtistSubPage from "../components/main/artist/ArtistRedirect";
import SpotifyCallback from "../components/SpotifyCallback";
import PageNotFound from "../components/PageNotFound";
import SavedTracks from "../components/main/Saved";
import Library from "../components/main/Library";
import Profile from "../components/main/Profile";
import Home from "../components/main/Home";
import Album from "../components/main/Album";
import Search from "../components/main/Search";
import Queue from "../components/main/Queue";
import PrivateRoute from "./PrivateRoute";

const router = createBrowserRouter([
  {
    path: '/',
    element: <Welcome/>
  },
  {
    path: '/callback',
    element: <SpotifyCallback/>
  },
  {
    path: '/',
    element: (
      <PrivateRoute>
        <SpotifyLayout/>
      </PrivateRoute>
    ),
    children: [
      {
        path: '/home',
        element: <Home/>
      },
      {
        path: '/profiles/:profile_id',
        element: <Profile/>
      },
      {
        path: '/playlists/:playlist_id',
        element: <Playlist/>
      },
      {
        path: '/artists/:artist_id/:page',
        element: <ArtistSubPage/>
      },
      {
        path: '/artists/:artist_id',
        element: <Artist/>
      },
      {
        path: '/albums/:album_id',
        element: <Album/>
      },
      {
        path: '/search',
        element: <Search/>
      },
      {
        path: '/saved',
        element: <SavedTracks/>
      },
      {
        path: '/library/:subpage',
        element: <Library/>
      },
      {
        path: '/queue',
        element: <Queue/>
      }
    ]
  },
  {
    path: '*',
    element: <PageNotFound/>
  }
]);

const Router: FC = () => {
  return (
    <RouterProvider router={router}/>
  );
};

export default Router;
