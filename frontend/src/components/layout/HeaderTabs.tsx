import React from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import {useHistory} from 'react-router-dom';
import {Grid} from "@material-ui/core";


export default function HeaderTabs() {
  let history = useHistory();

  const handleRouteChange = (event: React.ChangeEvent<{}>, newValue: string) => {
    history.push(newValue);
  };

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
