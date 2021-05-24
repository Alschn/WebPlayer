import {Grid} from "@material-ui/core";
import React, {FC} from "react";

interface FooterProps {

}

const Footer: FC<FooterProps> = () => {
  return (
    <Grid container justify="space-between" alignItems="center">
      <Grid item xs={3} className="footer__left">
        <p>Image, artists, heart icon</p>
      </Grid>

      <Grid item xs={6} className="footer__center">
        <p>Player, playback, back, pause/play, next, replay</p>
      </Grid>

      <Grid item xs={3} className="footer__right">
        <p>Queue, device, volume icon and slider</p>
      </Grid>
    </Grid>
  );
};

export default Footer;
