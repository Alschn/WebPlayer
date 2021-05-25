import React, {FC} from "react";
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import LibraryMusicOutlinedIcon from '@material-ui/icons/LibraryMusicOutlined';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import AddIcon from '@material-ui/icons/Add';
import FavoriteIcon from '@material-ui/icons/Favorite';
import {Grid} from "@material-ui/core";
import {useHistory} from "react-router-dom";

interface SidebarProps {

}

const Sidebar: FC<SidebarProps> = () => {
  let history = useHistory();

  const handleSettingsOnClick = (): void => {
  };

  const handleGoToRoute = (route: string): void => {
    console.log(route);
    // history.push(route);
  }

  return (
    <div className="sidebar__inner">
      <div className="sidebar__top">
        <p><MoreHorizIcon onClick={handleSettingsOnClick}/></p>
        <Grid container className="sidebar-navtab" key="/home">
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
              key="/library" onClick={() => handleGoToRoute("/library")}
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
              key="/new-playlist" onClick={() => handleGoToRoute("/new-playlist")}
        >
          <Grid item xs={2} className="icon-add-bg">
            <AddIcon className="icon-add"/>
          </Grid>

          <Grid item xs={10}>
            <span>Create playlist</span>
          </Grid>
        </Grid>

        <Grid container className="sidebar-tab"
              key="/favourites" onClick={() => handleGoToRoute("/favourites")}
        >
          <Grid item xs={2} className="icon-fav-bg">
            <FavoriteIcon className="icon-fav"/>
          </Grid>

          <Grid item xs={10}>
            <span>Favourite tracks</span>
          </Grid>
        </Grid>
        <hr/>
      </div>

      <Grid className="playlists">
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
          21, 22, 23, 24, 25, 26].map((i) => (<p key={`playlist${i}`}>Playlist name {i}</p>))}
      </Grid>
    </div>
  );
};

export default Sidebar;
