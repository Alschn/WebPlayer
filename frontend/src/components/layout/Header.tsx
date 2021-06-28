import React, {FC, MouseEvent, useContext, useState} from "react";
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import {Avatar, Grid} from "@material-ui/core";
import {useHistory} from "react-router-dom";
import UserContext from "../../context/userContext";
import HeaderTabs from "./HeaderTabs";
import {SearchBox} from "../main/Search";
import UserMenu from "./UserMenu";
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

const libraryPaths = ['/library/playlists', '/library/podcasts', '/library/artists', '/library/albums'];

const Header: FC = () => {
  let history = useHistory();
  const {username, imageURL, id} = useContext(UserContext);

  // User Menu
  const [anchorEl, setAnchorEl] = useState<Element | null>(null);
  const handleOpenMenu = (event: MouseEvent<any>): void => setAnchorEl(event.currentTarget);
  const handleCloseMenu = () => setAnchorEl(null);

  const pageBack = () => history.goBack();

  const pageForward = () => history.goForward();

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
        <div className="header__right-user" onClick={handleOpenMenu}>
          {imageURL && <Avatar alt="avatar" src={imageURL}/>}
          {username && <span className="header__right-user-name">{username}</span>}
          {Boolean(anchorEl) ? <ArrowDropUpIcon/> : <ArrowDropDownIcon/>}
        </div>
        <UserMenu profileID={id} anchorEl={anchorEl} handleClose={handleCloseMenu}/>
      </Grid>
    </Grid>
  );
};

export default Header;
