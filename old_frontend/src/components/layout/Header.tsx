import {FC, MouseEvent, useState} from "react";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import {Avatar, Grid} from "@mui/material";
import {useLocation, useNavigate} from "react-router-dom";
import HeaderTabs from "./HeaderTabs";
import {SearchBox} from "../main/Search";
import UserMenu from "./UserMenu";
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import useAuth from "../../hooks/useAuth";

const libraryPaths = [
  '/library/playlists',
  '/library/podcasts',
  '/library/artists',
  '/library/albums'
];

const LocationBasedHeaderTabs = () => {
  const location = useLocation();
  const loc = location.pathname;

  if (libraryPaths.includes(loc)) return <HeaderTabs/>;

  else if (loc === '/search') return <SearchBox/>;

  return null;
};

const Header: FC = () => {
  const navigate = useNavigate();
  const {user} = useAuth();

  // User Menu
  const [anchorEl, setAnchorEl] = useState<Element | null>(null);
  const handleOpenMenu = (event: MouseEvent<any>): void => setAnchorEl(event.currentTarget);
  const handleCloseMenu = () => setAnchorEl(null);

  const pageBack = () => navigate(-1);

  const pageForward = () => navigate(1);

  return (
    <Grid container className="header">
      <Grid item xs={3} lg={2} className="header-spacing"/>

      <Grid container item xs={9} lg={10} className="header-content">
        <Grid item className="header__left">
          <ChevronLeftIcon className="header__back" onClick={pageBack}/>
          <ChevronRightIcon className="header__forward" onClick={pageForward}/>
        </Grid>

        <Grid item className="header__location">
          <LocationBasedHeaderTabs/>
        </Grid>

        <Grid item xs={2} className="header__right">
          {!!user && (
            <>
              <div className="header__right-user" onClick={handleOpenMenu}>
                {!!user.images && <Avatar alt="avatar" src={user.images[0].url}/>}
                {!!user.display_name && <span className="header__right-user-name">{user.display_name}</span>}
                {Boolean(anchorEl) ? <ArrowDropUpIcon/> : <ArrowDropDownIcon/>}
              </div>
              <UserMenu profileID={user.id} anchorEl={anchorEl} handleClose={handleCloseMenu}/>
            </>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Header;
