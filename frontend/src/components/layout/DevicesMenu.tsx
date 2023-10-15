import {FC, useMemo} from "react";
import {Grid, List, ListItem, Popover} from "@mui/material";
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import {DeviceType, DeviceTypes, SpotifyDeviceObject} from "../../types/spotify";
import VolumeUpRoundedIcon from '@mui/icons-material/VolumeUpRounded';
import ComputerIcon from '@mui/icons-material/Computer';
import SmartphoneIcon from '@mui/icons-material/Smartphone';
import SpeakerIcon from '@mui/icons-material/Speaker';
import {getDevices, transferPlaybackToDevice} from "../../api/spotify";
import {useQuery} from "@tanstack/react-query";

interface DevicesMenuProps {
  anchorEl: Element | null,
  handleClose: () => void,
}

const DevicesMenu: FC<DevicesMenuProps> = ({anchorEl, handleClose}) => {
  const {
    data: devicesData
  } = useQuery({
    queryKey: ['devices'],
    queryFn: async () => {
      const res = await getDevices();
      return res.data as { devices: SpotifyDeviceObject[] };
    },
    refetchOnWindowFocus: false,
    enabled: !!anchorEl,
  });

  const devices = useMemo(() => {
    return devicesData?.devices ?? [];
  }, [devicesData]);

  const getIconByType = (type: DeviceType) => {
    switch (type) {
      case DeviceTypes.COMPUTER:
        return <ComputerIcon/>;

      case DeviceTypes.SMARTPHONE:
        return <SmartphoneIcon/>;

      case DeviceTypes.SPEAKER:
        return <SpeakerIcon/>;

      default:
        return <ComputerIcon/>;
    }
  };

  const selectDevice = (id: string) => {
    transferPlaybackToDevice(id).then(res => {
      console.log(res.data); // does not work for some reason
    }).catch(err => console.log(err));
  };

  const isOpen = Boolean(anchorEl);

  return (
    <Popover
      id="devices-popover"
      open={isOpen}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorOrigin={{
        vertical: -15,
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
    >
      <List
        id="devices-menu"
        className="devices-menu"
      >
        <ListItem>
          <h3>Connect to device</h3>
          <HelpOutlineIcon/>
        </ListItem>
        {devices.map(({name, type, is_active, id}) => (
          <ListItem
            key={`device-${id}`}
            onClick={() => selectDevice(id)}
          >
            {/* not working for some reason*/}
            {is_active ? (
                <Grid container className="device-active" alignItems="center">
                  <Grid item xs={2} className="device-icon">
                    {getIconByType(type)}
                  </Grid>
                  <Grid item xs={10} container>
                    <Grid item xs={12}>
                      Listening on device
                    </Grid>
                    <Grid item xs={12}>
                      <VolumeUpRoundedIcon/>{name}
                    </Grid>
                  </Grid>
                </Grid>
              )
              : (
                <Grid container alignItems="center">
                  <Grid item xs={2} className="device-icon">
                    {getIconByType(type)}
                  </Grid>
                  <Grid item xs={10} container>
                    <Grid item xs={12} className="device-name">
                      {name}
                    </Grid>
                    <Grid item xs={12} className="device-label">
                      <VolumeUpRoundedIcon/>Spotify Connect
                    </Grid>
                  </Grid>
                </Grid>
              )
            }
          </ListItem>
        ))}
      </List>
    </Popover>
  );
};

export default DevicesMenu;
