import {Divider, ListItem, Popover} from "@material-ui/core";
import {List} from "@material-ui/core";
import React, {FC} from "react";
import {useHistory} from "react-router-dom";
import {performLogout} from "../../utils/api";

interface UserMenuProps {
  profileID: string | undefined,
  anchorEl: Element | null,
  handleClose: () => void,
}

const UserMenu: FC<UserMenuProps> = ({profileID, anchorEl, handleClose}) => {
  let history = useHistory();

  const goToAccount = () => window.location.replace('https://www.spotify.com/');

  const goToProfile = () => history.push(`/profiles/${profileID}`);

  const goToSettings = () => history.push('/settings');

  const logout = () => {
    performLogout().then(() => {
      localStorage.removeItem('token');
      localStorage.removeItem('expirationDate');
      history.push('/');
    }).catch(err => console.log(err))
  };

  const open = Boolean(anchorEl);
  const id = open ? 'user-menu-open' : 'user-menu-closed';

  return (
    <Popover
      id={id}
      open={open}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: -40,
        horizontal: 'center',
      }}
    >
      <List className="user-menu">
        <ListItem button onClick={goToAccount}>
          Account
        </ListItem>

        <ListItem button onClick={goToProfile}>
          Profile
        </ListItem>

        <ListItem button onClick={goToSettings}>
          Settings
        </ListItem>

        <Divider className="user-menu-divider"/>

        <ListItem button onClick={logout}>
          Logout
        </ListItem>
      </List>
    </Popover>
  );
}

export default UserMenu;
