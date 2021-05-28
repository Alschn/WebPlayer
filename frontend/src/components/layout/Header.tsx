import React, {FC, useContext} from "react";
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import {Grid} from "@material-ui/core";
import {Avatar} from "@material-ui/core";
import {useHistory} from "react-router-dom";
import UserContext from "../../context/userContext";

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

  return (
    <Grid container className="header">
      <Grid item xs={2} className="header__left">
        <ChevronLeftIcon className="header__back" onClick={pageBack}/>
        <ChevronRightIcon className="header__forward" onClick={pageForward}/>
      </Grid>

      <Grid item xs={8}/>

      <Grid item xs={2} className="header__right">
        {imageURL && <Avatar alt="avatar" src={imageURL}/>}
        {username && <span>{username}</span>}
      </Grid>
    </Grid>
  );
};

export default Header;
