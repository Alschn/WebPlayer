import React, {FC, useState} from 'react';
import Grid from '@material-ui/core/Grid';
import Slider from '@material-ui/core/Slider';
import VolumeDown from '@material-ui/icons/VolumeDown';
import VolumeOffIcon from '@material-ui/icons/VolumeOff';
import VolumeDownIcon from '@material-ui/icons/VolumeDown';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import ImportantDevicesIcon from '@material-ui/icons/ImportantDevices';
import PlaylistPlayIcon from '@material-ui/icons/PlaylistPlay';


const VolumeSlider: FC = () => {
  const [value, setValue] = useState(30);

  const handleChange = (event: any, newValue: any): void => {
    setValue(newValue);
  };

  return (
    <Grid container className="volume-slider">
      {/*<Grid item>*/}
      {/*  <PlaylistPlayIcon/>*/}
      {/*</Grid>*/}

      {/*<Grid item>*/}
      {/*  <ImportantDevicesIcon/>*/}
      {/*</Grid>*/}

      <Grid item className="volume-slider-icon">
        <VolumeUpIcon/>
      </Grid>
      <Grid item xs>
        <Slider value={value} onChange={handleChange} aria-labelledby="volume-slider"/>
      </Grid>
    </Grid>
  );
}

export default VolumeSlider;
