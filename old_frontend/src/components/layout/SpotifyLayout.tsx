import {Grid} from "@mui/material";
import {FC, Fragment} from "react";
import Footer from "./Footer";
import Header from "./Header";
import Sidebar from "./Sidebar";
import {Outlet} from "react-router-dom";
import "./layout.scss";

interface SpotifyLayoutProps {

}

const SpotifyLayout: FC<SpotifyLayoutProps> = () => {
  return (
    <>
      <Grid container justifyContent="space-between" className="main">
        <Header/>
        <Grid item xs={3} lg={2} className="sidebar">
          <Sidebar/>
        </Grid>
        <Grid item xs={9} lg={10}>
          <div className="content" id="content">
            <Outlet/>
          </div>
        </Grid>
      </Grid>
      <Grid item xs={12} className="footer">
        <Footer/>
      </Grid>
    </>
  );
};

export default SpotifyLayout;
