import {Grid} from "@material-ui/core";
import React, {FC, useContext} from "react";
import UserContext from "../../context/userContext";

interface ProfileProps {

}

const Profile: FC<ProfileProps> = () => {
  const {username, imageURL} = useContext(UserContext);

  return (
    <Grid container>
      <Grid container className="profile__header">
        <h1>Profile page</h1>
      </Grid>

      <Grid container className="profile__popular_artists">

      </Grid>

      <Grid container className="profile__tracks">

      </Grid>

      <Grid container className="profile__public_playlists">

      </Grid>
    </Grid>
  )
};

export default Profile;
