import {Grid} from "@material-ui/core";
import React, {FC, useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import AxiosClient from "../../utils/axiosClient";
import {getMsToTime} from "../../utils/dataFormat";
import {
  SpotifyExternalUrlObject,
  SpotifyFollowersObject,
  SpotifyImageObject, SpotifyPlaylistTrackObject,
  SpotifyPublicUserObject
} from "../../types/spotify";
import SpotifyTable from "../layout/SpotifyTable";
import {loadMoreItems} from "../../utils/api";
import EditPlaylistDialog from "./playlist/EditPlaylistDialog";
import useUserData from "../../hooks/useUserData";


interface Parameters {
  id: string,
}

export interface SpotifyPlaylistInfo {
  collaborative: boolean,
  description: string,
  external_urls: SpotifyExternalUrlObject,
  followers: SpotifyFollowersObject,
  href: string,
  id: string,
  images: SpotifyImageObject[],
  name: string,
  owner: SpotifyPublicUserObject,
  primary_color?: string,
  public: boolean,
  snapshot_id?: string,
  type: string,
  uri: string,
}

const Playlist: FC = () => {
  // url parameter
  let {id} = useParams<Parameters>();

  const {id: user_id} = useUserData();

  // playlist info
  const [playlistInfo, setPlaylistInfo] = useState<SpotifyPlaylistInfo | null>(null);

  // playlists's tracks
  const [tracks, setTracks] = useState<SpotifyPlaylistTrackObject[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [next, setNext] = useState<string | null>(null);

  // edit playlist dialog
  const [isOpen, setIsOpen] = useState<boolean>(false);
  // force state update from dialog
  const [shouldUpdate, setShouldUpdate] = useState<number>(0);


  useEffect(() => {
    AxiosClient.get(`http://localhost:8000/api/spotify/playlists/${id}`).then(res => {
      const {tracks: {items, next, total}, ...rest} = res.data;
      if (shouldUpdate > 0) {
        // no need to fetch tracks again, they stay the same
        setPlaylistInfo(rest);
        return;
      }
      setTracks(items);
      setNext(next);
      setTotalCount(total);
      setPlaylistInfo(rest);
    }).catch(
      err => console.log(err)
    )
  }, [id, shouldUpdate]);

  const loadMoreTracks = (): void => {
    if (next) {
      loadMoreItems(`http://localhost:8000/api/spotify/playlists/${id}`, next).then(res => {
        const {items, next} = res.data;
        setTracks(prevState => [...prevState, ...items]);
        setNext(next);
      }).catch(err => console.log(err))
    }
  };

  const getPlaylistLength = (): string => {
    if (tracks) {
      let length = 0;
      tracks.forEach(({track: {duration_ms}}) => length += duration_ms)
      return getMsToTime(length);
    }
    return '';
  };

  const getPlaylistImage = (): string | undefined => {
    if (playlistInfo && playlistInfo.images.length > 0) {
      return playlistInfo.images[0].url
    }
    return undefined;
  };

  const handleOpen = () => {
    if (isOwner) setIsOpen(true);
  };

  const handleClose = () => {
    if (isOwner) setIsOpen(false);
  }

  const isOwner = playlistInfo && playlistInfo.owner.id === user_id;

  return (
    <div className="playlist__root">
      {playlistInfo && <Grid container alignItems="flex-end">
        <EditPlaylistDialog
          open={isOpen}
          handleClose={handleClose}
          playlistInfo={playlistInfo}
          forceUpdate={() => setShouldUpdate(prevState => prevState + 1)}
        />

        <Grid item className="playlist__info-left">
          <img src={getPlaylistImage()} alt="" width={300} height={300}/>
        </Grid>

        <Grid item className="playlist__info-right">
          <h4>PLAYLIST</h4>
          <h1 onClick={handleOpen} className={isOwner ? "playlist-owner-hover" : ""}>
            {playlistInfo.name}
          </h1>
          <p className={
            isOwner ?
              "playlist__info-right__description playlist-owner-hover" :
              "playlist__info-right__description"
          }
             onClick={handleOpen}
          >
            {playlistInfo.description}
          </p>
          <p className="playlist__info-right__stats">
            <Link
              to={`/profiles/${playlistInfo.owner.id}`}
            >{playlistInfo.owner.display_name}
            </Link>
            · {playlistInfo.followers.total} likes
            · {totalCount} tracks, {getPlaylistLength()}
          </p>
        </Grid>
      </Grid>}

      <Grid item xs={12} className="playlist__tracks">
        <SpotifyTable
          tableType="playlist"
          tracks={tracks}
          next={next}
          loadMore={loadMoreTracks}
        />
      </Grid>

      {next &&
      <button onClick={loadMoreTracks}>
        Load more
      </button>}

      <div className="playlist__recommended">

      </div>
    </div>
  );
};

export default Playlist;
