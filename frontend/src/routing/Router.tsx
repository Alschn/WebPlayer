import {FC} from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
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

const Router: FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index path="/" element={<Welcome/>}/>

        <Route path="/" element={
          <PrivateRoute>
            <SpotifyLayout/>
          </PrivateRoute>
        }>
          <Route path="/home" element={<Home/>}/>
          <Route path="/profiles/:id" element={<Profile/>}/>
          <Route path="/playlists/:id" element={<Playlist/>}/>
          <Route path="/artists/:id/:page" element={<ArtistSubPage/>}/>
          <Route path="/artists/:id" element={<Artist/>}/>
          <Route path="/albums/:id" element={<Album/>}/>
          <Route path="/search" element={<Search/>}/>
          <Route path="/saved" element={<SavedTracks/>}/>
          <Route path="/library/:subpage" element={<Library/>}/>
          <Route path="/queue" element={<Queue/>}/>
        </Route>

        <Route path="/callback" element={<SpotifyCallback/>}/>

        <Route path="*" element={<PageNotFound/>}/>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
