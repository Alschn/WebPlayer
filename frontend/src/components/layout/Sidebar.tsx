import {FC, useState} from "react";
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import LibraryMusicOutlinedIcon from '@mui/icons-material/LibraryMusicOutlined';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import AddIcon from '@mui/icons-material/Add';
import FavoriteIcon from '@mui/icons-material/Favorite';
import {Grid} from "@mui/material";
import {useHistory} from "react-router-dom";
import SidebarPlaylists from "./Playlists";
import useUserData from "../../hooks/useUserData";
import {createNewPlaylist} from "../../utils/api";
import {SpotifySimplifiedPlaylistObject} from "../../types/spotify";


const Sidebar: FC = () => {
  let history = useHistory();
  const {id: user_id} = useUserData();

  const [newPlaylist, setNewPlaylist] = useState<SpotifySimplifiedPlaylistObject | null>(null);

  const handleSettingsOnClick = (): void => {
  };

  const handleGoToRoute = (route: string): void => history.push(route);

  const handleCreatePlaylist = (): void => {
    if (user_id) {
      createNewPlaylist(user_id).then(
        ({data}) => {
          setNewPlaylist(data);
          const {id} = data;
          history.push(`/playlists/${id}`);
        }
      ).catch(err => console.log(err));
    }
  };

  return (
    <div className="sidebar__inner">
      <div className="sidebar__top">
        <p className="sidebar-settings">
          <MoreHorizIcon onClick={handleSettingsOnClick}/>
        </p>
        <Grid container className="sidebar-navtab"
              key="/home" onClick={() => handleGoToRoute("/home")}
        >
          <Grid item xs={2}>
            <HomeOutlinedIcon/>
          </Grid>

          <Grid item xs={10}>
            <span>Home</span>
          </Grid>
        </Grid>

        <Grid container className="sidebar-navtab"
              key="/search" onClick={() => handleGoToRoute("/search")}
        >
          <Grid item xs={2}>
            <SearchOutlinedIcon/>
          </Grid>

          <Grid item xs={10}>
            <span>Search</span>
          </Grid>
        </Grid>

        <Grid container className="sidebar-navtab"
              key="/library" onClick={() => handleGoToRoute("/library/playlists")}
        >
          <Grid item xs={2}>
            <LibraryMusicOutlinedIcon/>
          </Grid>

          <Grid item xs={10}>
            <span>Library</span>
          </Grid>
        </Grid>

        <div style={{marginTop: '20px'}}/>

        <Grid container className="sidebar-tab"
              key="/new-playlist" onClick={() => handleCreatePlaylist()}
        >
          <Grid item xs={2} className="icon-add-bg">
            <AddIcon className="icon-add"/>
          </Grid>

          <Grid item xs={10}>
            <span>Create playlist</span>
          </Grid>
        </Grid>

        <Grid container className="sidebar-tab"
              key="/favourites" onClick={() => handleGoToRoute("/saved")}
        >
          <Grid item xs={2}>
            <Grid item className="icon-fav-bg icon-fav-box">
              <FavoriteIcon className="icon-fav"/>
            </Grid>
          </Grid>

          <Grid item xs={10}>
            <span>Favourite tracks</span>
          </Grid>
        </Grid>
        <hr/>
      </div>

      <SidebarPlaylists newPlaylist={newPlaylist}/>
    </div>
  );
};

export default Sidebar;
