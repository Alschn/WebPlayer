import {Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@material-ui/core";
import React, {FC, useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import AxiosClient from "../../utils/axiosClient";
import {getMsToTime, getTimePassedSinceAdded} from "../../utils/dataFormat";
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import InfiniteScroll from "react-infinite-scroll-component";
import {
  SpotifyExternalUrlObject,
  SpotifyFollowersObject,
  SpotifyImageObject,
  SpotifyPublicUserObject
} from "../../types/spotify";
import {getArtistsWithLinks, getTrackImage} from "../../utils/formatComponents";


interface Parameters {
  id: string,
}

interface SpotifyPlaylistTrack {
  added_at: string,
  added_by: any, // to be replaced - object
  is_local: boolean,
  primary_color?: string | null,
  track: any, // to be replaced with SpotifyTrack
  video_thumbnail?: any,
}

interface SpotifyPlaylistInfo {
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

  // playlist info
  const [playlistInfo, setPlaylistInfo] = useState<SpotifyPlaylistInfo | null>(null);

  // playlists's tracks
  const [tracks, setTracks] = useState<SpotifyPlaylistTrack[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [next, setNext] = useState<string | null>(null);

  useEffect(() => {
    AxiosClient.get(`http://localhost:8000/api/spotify/playlists/${id}`).then(res => {
      const {tracks: {items, next, total}, ...rest} = res.data;
      setTracks(items);
      setNext(next);
      setTotalCount(total);
      setPlaylistInfo(rest);
    }).catch(
      err => console.log(err)
    )
  }, [id]);

  const loadMoreTracks = (): void => {
    if (next) {
      AxiosClient.put(`http://localhost:8000/api/spotify/playlists/${id}`, {
        next: next,
      }).then(res => {
        // console.log(res.data)
        const {items, next} = res.data;
        console.log(items)
        setTracks(prevState => [...prevState, ...items]);
        setNext(next);
      }).catch(
        err => console.log(err)
      )
    }
  };

  const getPlaylistLength = (): string => {
    if (tracks) {
      let length = 0;
      tracks.forEach(({track: {duration_ms}}) => length += duration_ms)
      return getMsToTime(length);
    }
    return '';
  }

  return (
    <div className="playlist__root">
      {playlistInfo && <Grid container alignItems="flex-end">
        <Grid item className="playlist__info-left">
          <img src={playlistInfo.images[0].url} alt="playlist-img" width={300} height={300}/>
        </Grid>

        <Grid item className="playlist__info-right">
          <h4>PLAYLIST</h4>
          <h1>{playlistInfo.name}</h1>
          <p className="playlist__info-right__description">{playlistInfo.description}</p>
          <p className="playlist__info-right__stats">
            <Link to="/">{playlistInfo.owner.display_name}</Link> · {playlistInfo.followers.total} likes
            · {totalCount} tracks, {getPlaylistLength()}
          </p>
        </Grid>
      </Grid>}

      <Grid item xs={12} className="playlist__tracks">
        <TableContainer>
          <InfiniteScroll
            next={loadMoreTracks}
            hasMore={next != null}
            loader={<h2>Loading more tracks ...</h2>}
            dataLength={tracks.length}
            scrollableTarget='content'
          >
            <Table aria-label="simple table" size="small">
              <TableHead className="playlist__tracks-header">
                <TableRow>
                  <TableCell align="left">#</TableCell>
                  <TableCell align="left">TITLE</TableCell>
                  <TableCell align="left">ALBUM</TableCell>
                  <TableCell align="left">ADDED</TableCell>
                  <TableCell align="left"><AccessTimeIcon fontSize="small"/></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {tracks.map(
                  (
                    {
                      added_at,
                      track: {
                        track_number, name, duration_ms, album: {
                          name: album_name,
                          id: album_id, images
                        }, artists
                      }
                    },
                    index
                  ) => (
                    <TableRow key={`track-${index}`} className="playlist__track-row">
                      <TableCell component="th" scope="row">{index + 1}</TableCell>
                      <TableCell align="left">
                        <Grid container alignItems="center">
                          <Grid item className="playlist__track-image">
                            <img src={getTrackImage(images)} width={40} height={40} alt=""/>
                          </Grid>
                          <Grid item>
                            <Grid item className="playlist__track-title">
                              <span>{name}</span>
                            </Grid>
                            <Grid item className="playlist__track-artists">
                              {getArtistsWithLinks(artists)}
                            </Grid>
                          </Grid>
                        </Grid>
                      </TableCell>
                      <TableCell align="left"><Link to={`/albums/${album_id}`}>{album_name}</Link></TableCell>
                      <TableCell align="left">{getTimePassedSinceAdded(added_at)}</TableCell>
                      <TableCell align="left">{getMsToTime(duration_ms, true)}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </InfiniteScroll>
        </TableContainer>
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
