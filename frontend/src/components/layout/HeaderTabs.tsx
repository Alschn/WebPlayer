import {Grid, Tab, Tabs} from "@mui/material";
import {ChangeEvent} from "react";
import {useLocation, useNavigate} from "react-router-dom";


export default function HeaderTabs() {
  const navigate = useNavigate();
  const location = useLocation();
  const handleRouteChange = (event: ChangeEvent<any>, newValue: string) => navigate(newValue);

  return (
    <Grid container>
      <Tabs
        value={location.pathname}
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
