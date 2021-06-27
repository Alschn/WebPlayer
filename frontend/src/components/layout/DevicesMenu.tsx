import React, {FC, useEffect, useState} from "react";
import {Grid, List, ListItem, Popover} from "@material-ui/core";
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import AxiosClient from "../../utils/axiosClient";
import {deviceType, SpotifyDeviceObject} from "../../types/spotify";
import VolumeUpRoundedIcon from '@material-ui/icons/VolumeUpRounded';
import ComputerIcon from '@material-ui/icons/Computer';
import SmartphoneIcon from '@material-ui/icons/Smartphone';
import SpeakerIcon from '@material-ui/icons/Speaker';
import {transferPlaybackToDevice} from "../player/api";

interface DevicesMenuProps {
  anchorEl: Element | null,
  handleClose: () => void,
}

const DevicesMenu: FC<DevicesMenuProps> = ({anchorEl, handleClose}) => {
  const [devices, setDevices] = useState<SpotifyDeviceObject[]>([]);

  useEffect(() => {
    anchorEl != null && AxiosClient.get('http://localhost:8000/api/spotify/devices')
      .then(res => {
        const {data: {devices}} = res;
        setDevices([...devices].reverse())
      })
      .catch(err => console.log(err))
  }, [anchorEl]);

  const getIconByType = (type: deviceType) => {
    switch (type) {
      case 'computer':
        return <ComputerIcon/>;
      case 'smartphone':
        return <SmartphoneIcon/>;
      case 'speaker':
        return <SpeakerIcon/>
      default:
        return <ComputerIcon/>;
    }
  }

  const selectDevice = (id: string) => {
    transferPlaybackToDevice(id).then(res => {
      console.log(res.data) // does not work for some reason
    }).catch(err => console.log(err))
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <Popover
      id={id}
      open={open}
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
      <List id="devices-menu" className="devices-menu">
        <ListItem>
          <h3>Connect to device</h3>
          <HelpOutlineIcon/>
        </ListItem>

        {devices.length > 0 && devices.map(({name, type, is_active, id}) => (
          <ListItem button onClick={() => selectDevice(id)}> {/* not working for some reason*/}
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
