import {Grid} from "@material-ui/core";
import React, {FC} from "react";
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import PauseCircleFilledIcon from '@material-ui/icons/PauseCircleFilled';
import RepeatIcon from '@material-ui/icons/Repeat';
import RepeatOneIcon from '@material-ui/icons/RepeatOne';
import ShuffleIcon from '@material-ui/icons/Shuffle';
import VolumeSlider from "./VolumeSlider";
import PlayerSlider from "./PlayerSlider";
import {usePlaybackState} from "react-spotify-web-playback-sdk";
import {pauseSong, playSong, setRepeatMode, setShuffle, skipSong} from "../player/api";


interface FooterProps {

}

const Footer: FC<FooterProps> = () => {
  const playbackState = usePlaybackState();

  const isPlaying = (): boolean | undefined => playbackState?.paused;

  const isShuffled = (): boolean | undefined => playbackState?.shuffle;

  const getRepeatMode = (): JSX.Element | null => {
    const num = playbackState?.repeat_mode;
    switch (num) {
      case 0: // no repeat, on click switch to loop
        return <RepeatIcon
          className="player__icons-hover"
          onClick={() => setRepeatMode('context')}
        />;
      case 1: // loop, on click switch to repeat once
        return (
          <RepeatIcon
            className="player__icons-green"
            onClick={() => setRepeatMode('track')}
          />
        );
      case 2: // repeat once, on click switch to no repeat
        return (
          <RepeatOneIcon
            className="player__icons-green"
            onClick={() => setRepeatMode('off')}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Grid container justify="space-between" alignItems="center">
      <Grid item xs={3} className="footer__left">
        <p>Image, artists, heart icon</p>
      </Grid>

      <Grid item xs={6} className="footer__center">
        <Grid container justify="center" alignItems="center" className="player__root">
          <Grid item xs={12} className="player__icons">
            {isShuffled() ?
              <ShuffleIcon onClick={() => setShuffle(false)} className="player__icons-green"/> :
              <ShuffleIcon onClick={() => setShuffle(true)} className="player__icons-hover"/>
            }
            <SkipPreviousIcon onClick={() => skipSong(false)} className="player__icons-hover"/>
            <span className="player__icons-center">
              {isPlaying() ?
                <PlayCircleFilledIcon onClick={playSong}/> :
                <PauseCircleFilledIcon onClick={pauseSong}/>
              }
            </span>
            <SkipNextIcon onClick={() => skipSong(true)} className="player__icons-hover"/>
            {getRepeatMode()}
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
