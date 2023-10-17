import {Divider, List, ListItem, Popover} from "@mui/material";
import {FC} from "react";
import {useNavigate} from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import {performLogout} from "../../api/spotify";

interface UserMenuProps {
  profileID: string | undefined,
  anchorEl: Element | null,
  handleClose: () => void,
}

const UserMenu: FC<UserMenuProps> = ({profileID, anchorEl, handleClose}) => {
  const {setToken} = useAuth();
  const navigate = useNavigate();

  const goToAccount = () => window.location.replace('https://www.spotify.com/');

  const goToProfile = () => navigate(`/profiles/${profileID}`);

  const goToSettings = () => navigate('/settings');

  const logout = () => {
    performLogout().finally(() => {
      localStorage.removeItem('token');
      setToken(null);
    }).catch(err => console.log(err));
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
        <ListItem onClick={goToAccount}>
          Account
        </ListItem>

        <ListItem onClick={goToProfile}>
          Profile
        </ListItem>

        <ListItem onClick={goToSettings}>
          Settings
        </ListItem>

        <Divider className="user-menu-divider"/>

        <ListItem onClick={logout}>
          Logout
        </ListItem>
      </List>
    </Popover>
  );
};

export default UserMenu;
