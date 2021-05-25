import React, {FC, useState} from 'react';
import Grid from '@material-ui/core/Grid';
import Slider from '@material-ui/core/Slider';

interface PlayerSliderProps {
  position?: number | string;
  duration?: number | string;
}

enum RepeatMode {
  noRepeat,
  repeatLoop,
  repeatOnce,
}

const PlayerSlider: FC<PlayerSliderProps> = ({position, duration}) => {
  const [value, setValue] = useState(50);

  const [repeat, setRepeat] = useState<RepeatMode>(RepeatMode.noRepeat);
  const [playback, setPlayback] = useState<boolean>(false);

  const handleChange = (event: any, newValue: any): void => {
    setValue(newValue);
  };

  const getFormattedTime = (time_in_ms: number): string => {
    return String(time_in_ms);
  }

  return (
    <div className="player-slider">
      <Grid container>
        <Grid item>
          {position}
        </Grid>

        <Grid item xs>
          <Slider value={value} onChange={handleChange} aria-labelledby="player-slider-slider"/>
        </Grid>

        <Grid item>
          {duration}
        </Grid>
      </Grid>
    </div>
  );
}

export default PlayerSlider;
