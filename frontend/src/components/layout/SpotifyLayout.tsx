import {Grid} from "@material-ui/core";
import React, {FC, Fragment, ReactNode} from "react";
import Footer from "./Footer";
import Header from "./Header";
import Sidebar from "./Sidebar";
import "./layout.scss";

interface SpotifyLayoutProps {
  children: ReactNode;
}

const SpotifyLayout: FC<SpotifyLayoutProps> = ({children}) => {
  return (
    <Fragment>
      <Grid container justify="space-between" className="main" >
        <Grid item xs={3} lg={2} className="sidebar">
          <Sidebar/>
        </Grid>

        <Grid item xs={9} lg={10}>
          <Header/>
          <div className="content">
            {children}
          </div>
        </Grid>
      </Grid>

      <Grid item xs={12} className="footer">
        <Footer/>
      </Grid>
    </Fragment>
  )
}

export default SpotifyLayout;
