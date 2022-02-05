import {useHistory} from 'react-router-dom';
import {Grid, Tab, Tabs} from "@mui/material";
import {ChangeEvent} from "react";


export default function HeaderTabs() {
  const history = useHistory();
  const handleRouteChange = (event: ChangeEvent<any>, newValue: string) => history.push(newValue);

  return (
    <Grid container>
      <Tabs
        value={history.location.pathname}
        onChange={handleRouteChange}
        indicatorColor="primary"
        textColor="primary"
        className="header__tabs"
      >
        <Tab value="/library/playlists" label="Playlists"/>
        <Tab value="/library/podcasts" label="Podcasts"/>
        <Tab value="/library/artists" label="Artists"/>
        <Tab value="/library/albums" label="Albums"/>
      </Tabs>
    </Grid>
  );
}
