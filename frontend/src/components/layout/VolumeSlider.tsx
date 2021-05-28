import React, {FC, useState} from 'react';
import Grid from '@material-ui/core/Grid';
import VolumeDown from '@material-ui/icons/VolumeDown';
import VolumeOffIcon from '@material-ui/icons/VolumeOff';
import VolumeMuteIcon from '@material-ui/icons/VolumeMute';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import ImportantDevicesIcon from '@material-ui/icons/ImportantDevices';
import PlaylistPlayIcon from '@material-ui/icons/PlaylistPlay';
import SpotifySlider from "./SpotifySlider";


const VolumeSlider: FC = () => {
  const [value, setValue] = useState(30);

  const handleChange = (event: any, newValue: any): void => {
    setValue(newValue);
  };

  const setVolume = (newVolume: number): void => {
    // send request to api, then set volume
    setValue(newVolume);
  }

  const getVolumeIcon = (): JSX.Element => {
    if (60 <= value) return <VolumeUpIcon/>
    else if (5 < value) return <VolumeDown/>
    else if (0 < value && value <= 5) return <VolumeMuteIcon/>
    else return <VolumeOffIcon/>;
  }

  return (
    <Grid container className="volume-slider__root">
      <Grid item className="volume-slider-icon">
        <PlaylistPlayIcon/>
      </Grid>

      <Grid item className="volume-slider-icon">
        <ImportantDevicesIcon/>
      </Grid>

      <Grid item className="volume-slider-icon" onClick={() => setVolume(0)}>
        {getVolumeIcon()}
      </Grid>
      <Grid item xs className="volume-slider">
        <SpotifySlider value={value} onChange={handleChange} aria-labelledby="volume-slider"/>
      </Grid>
    </Grid>
  );
}

export default VolumeSlider;
