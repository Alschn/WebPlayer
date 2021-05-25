import {Grid} from "@material-ui/core";
import React, {FC, useState} from "react";
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import PauseCircleFilledIcon from '@material-ui/icons/PauseCircleFilled';
import RepeatIcon from '@material-ui/icons/Repeat';
import RepeatOneIcon from '@material-ui/icons/RepeatOne';
import ImportantDevicesIcon from '@material-ui/icons/ImportantDevices';
import PlaylistPlayIcon from '@material-ui/icons/PlaylistPlay';

import VolumeSlider from "./VolumeSlider";
import PlayerSlider from "./PlayerSlider";


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
        <PlayerSlider position="0:33" duration="2:45"/>
      </Grid>

      <Grid item xs={3} className="footer__right">
        <p>Queue, device, volume icon and slider</p>
        <VolumeSlider/>
      </Grid>
    </Grid>
  );
};

export default Footer;
