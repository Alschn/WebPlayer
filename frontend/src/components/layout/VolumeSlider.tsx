import React, {ChangeEvent, FC, MouseEvent, useState} from 'react';
import Grid from '@material-ui/core/Grid';
import VolumeDown from '@material-ui/icons/VolumeDown';
import VolumeOffIcon from '@material-ui/icons/VolumeOff';
import VolumeMuteIcon from '@material-ui/icons/VolumeMute';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import ImportantDevicesIcon from '@material-ui/icons/ImportantDevices';
import PlaylistPlayIcon from '@material-ui/icons/PlaylistPlay';
import SpotifySlider from "./SpotifySlider";
import {setVolume} from "../player/api";
import {useHistory} from 'react-router-dom';
import DevicesMenu from "./DevicesMenu";


const VolumeSlider: FC = () => {
  let history = useHistory();
  const [value, setValue] = useState(30);

  const handleChange = (event: ChangeEvent<any>, newValue: any): void => {
    handleSetVolume(newValue);
  };

  const handleSetVolume = (volume: number): void => {
    setVolume(Math.floor(volume)).then(() => setValue(volume));
  };

  const getVolumeIcon = (): JSX.Element => {
    if (60 <= value) return <VolumeUpIcon/>
    else if (5 < value) return <VolumeDown/>
    else if (0 < value && value <= 5) return <VolumeMuteIcon/>
    else return <VolumeOffIcon/>;
  };

  const goToQueue = (): any => history.push('/queue');

  // Devices Menu
  const [anchorEl, setAnchorEl] = useState<Element | null>(null);
  const handleClick = (event: MouseEvent<any>): void => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  return (
    <Grid container className="volume-slider__root">
      <Grid item className="volume-slider-icon">
        <PlaylistPlayIcon onClick={goToQueue}/>
      </Grid>

      <Grid item className="volume-slider-icon">
        <ImportantDevicesIcon onClick={handleClick}/>
        <DevicesMenu
          anchorEl={anchorEl}
          handleClose={handleClose}
        />
      </Grid>

      <Grid item className="volume-slider-icon" onClick={() => handleSetVolume(0)}>
        {getVolumeIcon()}
      </Grid>
      <Grid item xs className="volume-slider">
        <SpotifySlider value={value} onChange={handleChange} aria-labelledby="volume-slider"/>
      </Grid>
    </Grid>
  );
}

export default VolumeSlider;
