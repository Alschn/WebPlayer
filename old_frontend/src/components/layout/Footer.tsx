import {Grid} from "@mui/material";
import {FC, useMemo} from "react";
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';
import PauseCircleFilledIcon from '@mui/icons-material/PauseCircleFilled';
import RepeatIcon from '@mui/icons-material/Repeat';
import RepeatOneIcon from '@mui/icons-material/RepeatOne';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import VolumeSlider from "./VolumeSlider";
import PlayerSlider from "./PlayerSlider";
import {usePlaybackState, useSpotifyPlayer} from "react-spotify-web-playback-sdk";
import {setRepeatMode, setShuffle} from "../../api/spotify";
import {getArtistsFromSDK, getTrackImage} from "../../utils/formatComponents";
import {Link} from "react-router-dom";


const RepeatModes = {
  NO_REPEAT: 0,
  LOOP: 1,
  REPEAT_ONCE: 2
} as const;


const POLLING_INTERVAL_MS = 5_000;

const RepeatMode = () => {
  const playbackState = usePlaybackState(true, POLLING_INTERVAL_MS);
  const repeat_mode_num = playbackState?.repeat_mode;

  switch (repeat_mode_num) {
    // no repeat, on click switch to loop
    case RepeatModes.NO_REPEAT:
      return (
        <RepeatIcon
          className="player__icons-hover"
          onClick={() => setRepeatMode('context')}
        />
      );

    // loop, on click switch to repeat once
    case RepeatModes.LOOP:
      return (
        <RepeatIcon
          className="player__icons-green"
          onClick={() => setRepeatMode('track')}
        />
      );

    // repeat once, on click switch to no repeat
    case RepeatModes.REPEAT_ONCE:
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

const Footer: FC = () => {
  const playbackState = usePlaybackState(true, POLLING_INTERVAL_MS);
  const player = useSpotifyPlayer();

  const TrackInfo = useMemo(() => {
    const track = playbackState?.track_window.current_track;
    if (!track) return null;

    // @ts-ignore
    const artists = getArtistsFromSDK(track.artists);
    const title = track.name;
    const track_id = track.id; // idk if it should be album or track id
    const album = getTrackImage(track.album.images);

    return (
      <Grid container alignItems="center" className="footer__left-container">
        <Grid item className="footer_left-album" xs={3} sm={2}>
          <img src={album} alt=""/>
        </Grid>
        <Grid item className="footer__left-desc" xs={9} sm={10}>
          <Grid container>
            <Grid item xs={12} className="footer__left-title">
              <Link to={`/tracks/${track_id}`}>
                <span className="text">{title}</span>
              </Link>
            </Grid>
            <Grid item xs={12} className="footer__left-artists text">
              {artists}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }, [playbackState]);

  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item xs={3} className="footer__left">
        {TrackInfo}
      </Grid>

      <Grid item xs={6} className="footer__center">
        <Grid container justifyContent="center" alignItems="center" className="player__root">
          <Grid item xs={12} className="player__icons">
            {playbackState?.shuffle ?
              <ShuffleIcon onClick={() => setShuffle(false)} className="player__icons-green"/> :
              <ShuffleIcon onClick={() => setShuffle(true)} className="player__icons-hover"/>
            }
            <SkipPreviousIcon onClick={() => player?.previousTrack()} className="player__icons-hover"/>
            <span className="player__icons-center">
              {playbackState?.paused ?
                <PlayCircleFilledIcon onClick={() => player?.resume()}/> :
                <PauseCircleFilledIcon onClick={() => player?.pause()}/>
              }
            </span>
            <SkipNextIcon onClick={() => player?.nextTrack()} className="player__icons-hover"/>
            <RepeatMode/>
          </Grid>
          <PlayerSlider position={playbackState?.position} duration={playbackState?.duration}/>
        </Grid>
      </Grid>

      <Grid item xs={3} className="footer__right">
        <Grid container justifyContent="flex-end" alignItems="center">
          <VolumeSlider/>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Footer;
