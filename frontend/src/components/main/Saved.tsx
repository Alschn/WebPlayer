import React, {FC, useContext, useEffect, useState} from "react";
import {Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@material-ui/core";
import {Link} from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import {getArtistsWithLinks, getTrackImage} from "../../utils/formatComponents";
import {getMsToTime, getTimePassedSinceAdded} from "../../utils/dataFormat";
import UserContext from "../../context/userContext";
import AxiosClient from "../../utils/axiosClient";
import FavoriteIcon from "@material-ui/icons/Favorite";
import useSingleAndDoubleClick from "../../hooks/useSingleAndDoubleClick";

interface SpotifyPlaylistTrack {
  added_at: string,
  added_by: any, // to be replaced - object
  is_local: boolean,
  primary_color?: string,
  track: any, // to be replaced with SpotifyTrack
  video_thumbnail?: any,
}

const SavedTracks: FC = () => {
  const {imageURL, username, id} = useContext(UserContext);

  const [tracks, setTracks] = useState<SpotifyPlaylistTrack[]>([]);
  const [totalCount, setTotalCount] = useState<number | null>(null);
  const [next, setNext] = useState<string | null>(null);

  useEffect(() => {
    AxiosClient.get(`http://localhost:8000/api/spotify/saved`).then(res => {
      const {data: {items, next, total}} = res;
      setTracks(items);
      setNext(next);
      setTotalCount(total);
    }).catch(
      err => console.log(err)
    )
  }, []);

  const loadMoreTracks = (): void => {
    if (next) {
      AxiosClient.put(`http://localhost:8000/api/spotify/saved`, {
        next: next,
      }).then(res => {
        const {data: {items, next}} = res;
        setTracks(prevState => [...prevState, ...items]);
        setNext(next);
      }).catch(
        err => console.log(err)
      )
    }
  };

  const [selected, setSelected] = useState<Element | null>(null);

  const handleSingleClick = (row: number): void => {
    const select = document.getElementById(`track-${row}`);
    if (select && select !== selected) {
      setSelected(((prev: Element | null) => {
          if (prev) prev.classList.remove('Mui-selected');
          select.classList.add('Mui-selected');
          return select;
        }
      ));
    }
  };

  const handleDoubleClick = (row: number): void => {
    if (selected) selected.classList.remove('Mui-selected');
    console.log(`playing track with index ${row}`);
  }

  const handleClick = useSingleAndDoubleClick(handleSingleClick, handleDoubleClick);

  return (
    <div className="playlist__root">
      <Grid container alignItems="flex-end">
        <Grid item className="playlist__info-left">
          <Grid item className="icon-fav-bg icon-fav-box">
            <FavoriteIcon className="icon-fav"/>
          </Grid>
        </Grid>

        <Grid item className="playlist__info-right">
          <h4>PLAYLIST</h4>
          <h1 id="favourite-tracks-title">Favourite tracks</h1>
          <p className="playlist__info-right__stats">
            <img src={imageURL} alt="user-avatar"/>
            <Link to={`/profiles/${id}`}>{username}</Link> · {totalCount} tracks
          </p>
        </Grid>
      </Grid>

      <Grid item xs={12} className="playlist__tracks">
        <TableContainer>
          <InfiniteScroll
            next={loadMoreTracks}
            hasMore={next != null}
            loader={<h2>Loading more tracks ...</h2>}
            dataLength={tracks.length}
            scrollableTarget='content'
          >
            <Table aria-label="playlist-tracks-table" size="small">
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
                    <TableRow key={`track-${index + 1}`} className="playlist__track-row" id={`track-${index + 1}`}
                              onClick={() => handleClick(index + 1)}
                    >
                      <TableCell component="th" scope="row">{index + 1}</TableCell>
                      <TableCell align="left">
                        <Grid container alignItems="center">
                          <Grid item className="playlist__track-image">
                            <img src={getTrackImage(images)} alt=""/>
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
    </div>
  );
};

export default SavedTracks;
