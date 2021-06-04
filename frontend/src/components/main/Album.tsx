import React, {FC, useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import AxiosClient from "../../utils/axiosClient";
import {SpotifySimplifiedTrackObject} from "../../types/spotify";
import {Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@material-ui/core";
import {getMsToTime, getPlaylistLength} from "../../utils/dataFormat";
import InfiniteScroll from "react-infinite-scroll-component";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import {getArtistsWithLinks} from "../../utils/formatComponents";
import ExplicitIcon from '@material-ui/icons/Explicit';

interface Parameters {
  id: string,
}

const Album: FC = () => {
  let {id} = useParams<Parameters>();
  const [tracks, setTracks] = useState<SpotifySimplifiedTrackObject[]>([]);
  const [artists, setArtists] = useState<any[]>([]);
  const [albumInfo, setAlbumInfo] = useState<any>({});
  const [next, setNext] = useState<string | null>(null);

  useEffect(() => {
    AxiosClient.get(`http://localhost:8000/api/spotify/albums/${id}`).then(res => {
      console.log(res.data);
      const {data: {artists, tracks: {items, next}, ...rest}} = res;
      setArtists(artists);
      setTracks(items);
      setNext(next);
      setAlbumInfo(rest);
    }).catch(
      err => console.log(err)
    )
  }, [id]);

  const getAuthor = (): string | undefined => {
    try {
      return artists[0].name;
    } catch {
      return undefined;
    }
  };

  const getAlbumCover = (): string | undefined => {
    try {
      return albumInfo.images[0].url;
    } catch {
      return undefined;
    }
  };

  const loadMoreTracks = () => {
  };

  return (
    <div className="playlist__root">
      {albumInfo && tracks && <Grid container alignItems="flex-end">
        <Grid item className="playlist__info-left">
          <img src={getAlbumCover()} alt="playlist-img" width={300} height={300}/>
        </Grid>

        <Grid item className="playlist__info-right">
          <h4>ALBUM</h4>
          <h1 id="album-title">{albumInfo.name}</h1>
          <p className="playlist__info-right__stats">
            <Link to="/">{getAuthor()}</Link> · {albumInfo.total_tracks} tracks, {getPlaylistLength(tracks)}
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
                  <TableCell align="left">REPLAYS</TableCell>
                  <TableCell align="left"><AccessTimeIcon fontSize="small"/></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {tracks.map(
                  ({artists, duration_ms, name, explicit}, index) => (
                    <TableRow key={`track-${index}`} className="playlist__track-row">
                      <TableCell component="th" scope="row">{index + 1}</TableCell>
                      <TableCell align="left">
                        <Grid container alignItems="center">
                          <Grid item>
                            <Grid item className="playlist__track-title">
                              <span>{name}</span>
                            </Grid>
                            <Grid item className="playlist__track-artists">
                              {explicit && <ExplicitIcon/>}{getArtistsWithLinks(artists)}
                            </Grid>
                          </Grid>
                        </Grid>
                      </TableCell>
                      <TableCell align="left">{""}</TableCell>
                      <TableCell align="left">{getMsToTime(duration_ms, true)}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </InfiniteScroll>
        </TableContainer>
      </Grid>
    </div>
  );
};

export default Album;
