import React, {FC, useState} from 'react';
import Grid from '@material-ui/core/Grid';
import {getMsToTime} from "../../utils/dataFormat";
import SpotifySlider from './SpotifySlider';

interface PlayerSliderProps {
  position: number;
  duration: number;
}

enum RepeatMode {
  noRepeat,
  repeatLoop,
  repeatOnce,
}


const PlayerSlider: FC<PlayerSliderProps> = ({position = 0, duration = 0}) => {
  const [value, setValue] = useState(50);

  const [repeat, setRepeat] = useState<RepeatMode>(RepeatMode.noRepeat);
  const [playback, setPlayback] = useState<boolean>(false);

  const handleChange = (event: any, newValue: any): void => {
    setValue(newValue);
  };

  return (
    <Grid container className="player-slider" justify="center">
      <Grid item>
        {getMsToTime(position, true)}
      </Grid>

      <Grid item xs className="player-slider__root">
        <SpotifySlider value={value} onChange={handleChange} aria-labelledby="player-slider-slider"/>
      </Grid>

      <Grid item>
        {getMsToTime(duration, true)}
      </Grid>
    </Grid>
  );
}

export default PlayerSlider;
