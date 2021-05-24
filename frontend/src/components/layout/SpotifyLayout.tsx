import {Grid} from "@material-ui/core";
import React, {FC, ReactNode} from "react";
import Footer from "./Footer";
import Header from "./Header";
import Sidebar from "./Sidebar";
import "./layout.scss";

interface SpotifyLayoutProps {
  children: ReactNode;
}

const SpotifyLayout: FC<SpotifyLayoutProps> = ({children}) => {
  return (
    <Grid container justify="space-between" alignItems="flex-start">
      <Grid item xs={3} lg={2} className="sidebar">
        <Sidebar/>
      </Grid>

      <Grid item xs={9} lg={10} className="main">
        <Header/>
        <div className="content">
          {children}
        </div>
      </Grid>

      <Grid item xs={12} className="footer">
        <Footer/>
      </Grid>
    </Grid>
  )
}

export default SpotifyLayout;
