import {Grid} from "@material-ui/core";
import React, {FC} from "react";
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import PauseCircleFilledIcon from '@material-ui/icons/PauseCircleFilled';
import RepeatIcon from '@material-ui/icons/Repeat';
import RepeatOneIcon from '@material-ui/icons/RepeatOne';
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
        <Grid container justify="center" alignItems="center" className="player__root">
          <Grid item xs={12} className="player__icons">
            <RepeatIcon/>
            <SkipPreviousIcon/>
            <PlayCircleFilledIcon/>
            <SkipNextIcon/>
            <RepeatOneIcon/>
          </Grid>
          <PlayerSlider position={0} duration={245230}/>
        </Grid>
      </Grid>

      <Grid item xs={3} className="footer__right">
        <Grid container justify="flex-end" alignItems="center">
          <VolumeSlider/>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Footer;
