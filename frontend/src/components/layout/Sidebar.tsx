import React, {FC, Fragment} from "react";
import HomeIcon from '@material-ui/icons/Home';
import SearchIcon from '@material-ui/icons/Search';
import LibraryMusicIcon from '@material-ui/icons/LibraryMusic';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import AddIcon from '@material-ui/icons/Add';
import FavoriteIcon from '@material-ui/icons/Favorite';

interface SidebarProps {

}

const Sidebar: FC<SidebarProps> = () => {
  return (
    <Fragment>
      <p><MoreHorizIcon/></p>
      <p><HomeIcon/>Home</p>
      <p><SearchIcon/>Search</p>
      <p><LibraryMusicIcon/>Library</p>

      <p><AddIcon/>Create playlist</p>
      <p><FavoriteIcon/>Favourite tracks</p>

      <hr/>

      <div className="playlists">
        {[0, 1, 2, 3, 4, 5, 6, 7].map(() => (<p>Playlist name</p>))}
      </div>
    </Fragment>
  );
};

export default Sidebar;
