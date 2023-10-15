import {FC, MouseEvent, useMemo, useState} from 'react';
import Grid from '@mui/material/Grid';
import VolumeDown from '@mui/icons-material/VolumeDown';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import VolumeMuteIcon from '@mui/icons-material/VolumeMute';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import ImportantDevicesIcon from '@mui/icons-material/ImportantDevices';
import PlaylistPlayIcon from '@mui/icons-material/PlaylistPlay';
import SpotifySlider from "./SpotifySlider";
import {useNavigate} from 'react-router-dom';
import DevicesMenu from "./DevicesMenu";
import {setVolume} from "../../api/spotify";


const VolumeSlider: FC = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState(30);

  const handleChange = (event: any, newValue: any, activeThumb: any): void => {
    handleSetVolume(newValue);
  };

  const handleSetVolume = (volume: number): void => {
    setVolume(Math.floor(volume)).then(() => setValue(volume));
  };

  const VolumeIcon = useMemo(() => {
    if (60 <= value) return <VolumeUpIcon/>;
    else if (5 < value) return <VolumeDown/>;
    else if (0 < value && value <= 5) return <VolumeMuteIcon/>;
    else return <VolumeOffIcon/>;
  }, [value]);

  const goToQueue = (): void => navigate('/queue');

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
        {VolumeIcon}
      </Grid>
      <Grid item xs className="volume-slider">
        <SpotifySlider value={value} onChange={handleChange} aria-labelledby="volume-slider"/>
      </Grid>
    </Grid>
  );
};

export default VolumeSlider;
