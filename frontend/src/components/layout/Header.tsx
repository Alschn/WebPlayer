import React, {FC, useContext} from "react";
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import {Grid} from "@material-ui/core";
import {Avatar} from "@material-ui/core";
import {useHistory} from "react-router-dom";
import UserContext from "../../context/userContext";
import HeaderTabs from "./HeaderTabs";
import {SearchBox} from "../main/Search";

const libraryPaths = ['/library/playlists', '/library/podcasts', '/library/artists', '/library/albums'];

interface HeaderProps {

}

const Header: FC<HeaderProps> = () => {
  let history = useHistory();
  const {username, imageURL} = useContext(UserContext);

  const pageBack = () => {
    history.goBack();
  }

  const pageForward = () => {
    history.goForward();
  }

  const getLocationBasedPart = (): JSX.Element | null => {
    const loc = history.location.pathname;

    if (libraryPaths.includes(loc)) return <HeaderTabs/>;

    switch (loc) {
      case '/search':
        return <SearchBox/>;
      default:
        return null;
    }
  }

  return (
    <Grid container className="header">
      <Grid item className="header__left">
        <ChevronLeftIcon className="header__back" onClick={pageBack}/>
        <ChevronRightIcon className="header__forward" onClick={pageForward}/>
      </Grid>

      <Grid item className="header__location">
        {getLocationBasedPart()}
      </Grid>

      <Grid item xs={2} className="header__right">
        {imageURL && <Avatar alt="avatar" src={imageURL}/>}
        {username && <span>{username}</span>}
      </Grid>
    </Grid>
  );
};

export default Header;
