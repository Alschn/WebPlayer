import {Grid} from "@mui/material";
import {FC, Fragment} from "react";

const Home: FC = () => {
  return (
    <Fragment>
      <h1>Good evening</h1>
      <Grid container className="home__recent-playlists">
        <Grid item xs={3}>

        </Grid>
      </Grid>

      <Grid container className="home__recently-played">
        <Grid item xs={2}>

        </Grid>
      </Grid>

      <Grid container className="home__podcasts">
        <Grid item xs={2}>

        </Grid>
      </Grid>
    </Fragment>
  );
};

export default Home;
