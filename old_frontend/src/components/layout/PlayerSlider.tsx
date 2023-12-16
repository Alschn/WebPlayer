import {FC, useEffect, useState} from 'react';
import {Grid} from '@mui/material';
import {getMsToTime} from "../../utils/dataFormat";
import SpotifySlider from './SpotifySlider';
import {useSpotifyPlayer} from "react-spotify-web-playback-sdk";

interface PlayerSliderProps {
  position?: number;
  duration?: number;
}


const PlayerSlider: FC<PlayerSliderProps> = ({position, duration}) => {
  const [value, setValue] = useState(0);
  const player = useSpotifyPlayer();

  const pos = position ?? 0;
  const dur = duration ?? 0;

  useEffect(() => {
    const newValue = dur === 0 ? 0 : 100 * pos / dur;
    setValue(newValue);
  }, [pos, dur]);

  const handleChange = (_event: unknown, newValue: any): void => {
    if (!player) return;
    const positionToSeek = Math.floor((newValue * dur) / 100);
    player.seek(positionToSeek).then(() => setValue(newValue));
  };

  return (
    <Grid container className="player-slider" justifyContent="center">
      <Grid item>
        {getMsToTime(pos, true)}
      </Grid>

      <Grid item xs className="player-slider__root">
        <SpotifySlider
          value={value}
          onChange={handleChange}
          aria-labelledby="player-slider-slider"
        />
      </Grid>

      <Grid item>
        {getMsToTime(dur, true)}
      </Grid>
    </Grid>
  );
};

export default PlayerSlider;
