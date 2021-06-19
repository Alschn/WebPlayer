import React, {FC, useState} from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import {Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@material-ui/core";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import ExplicitIcon from "@material-ui/icons/Explicit";
import {getArtistsWithLinks, getTrackImage} from "../../utils/formatComponents";
import {getMsToTime, getTimePassedSinceAdded} from "../../utils/dataFormat";
import {Link} from "react-router-dom";
import useSingleAndDoubleClick from "../../hooks/useSingleAndDoubleClick";
import {playSongWithUri} from "../player/api";
import {usePlaybackState} from "react-spotify-web-playback-sdk";


interface SpotifyTableProps {
  tableType: spotifyTableType,
  tracks: any[],
  next: string | null;
  loadMore: () => void;
}

type spotifyTableType = "album" | "playlist";

const SpotifyTable: FC<SpotifyTableProps> = ({next, tracks, loadMore, tableType}) => {
  const [selected, setSelected] = useState<Element | null>(null);
  const playbackState = usePlaybackState();

  const handleSingleClick = (index: number): void => {
    const select = document.getElementById(`track-${index}`);
    if (select && select !== selected) {
      setSelected(((prev: Element | null) => {
          if (prev) prev.classList.remove('Mui-selected');
          select.classList.add('Mui-selected');
          return select;
        }
      ));
    }
  };

  const handleDoubleClick = (row: string): void => {
    if (selected) selected.classList.remove('Mui-selected');
    playSongWithUri(row, playbackState?.context.uri)
      .then(() => console.log(`Playing song with uri ${row}, context ${playbackState?.context.uri}`))
  }

  const handleClick = useSingleAndDoubleClick(handleSingleClick, handleDoubleClick);

  if (tracks.length === 0) return null;

  if (tableType === 'album') {
    return (
      <TableContainer>
        <InfiniteScroll
          next={loadMore}
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
                ({artists, duration_ms, name, explicit, uri}, index) => (
                  <TableRow
                    key={`track-${index}`}
                    className="playlist__track-row"
                    id={`track-${index + 1}`}
                    onClick={() => handleClick(uri, index + 1)}
                  >
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
    );
  } else if (tableType === 'playlist') {
    return (
      <TableContainer>
        <InfiniteScroll
          next={loadMore}
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
                      track_number, name, duration_ms, uri, album: {
                        name: album_name,
                        id: album_id, images
                      }, artists
                    }
                  },
                  index
                ) => (
                  <TableRow
                    key={`track-${index + 1}`}
                    className="playlist__track-row"
                    id={`track-${index + 1}`}
                    onClick={() => handleClick(uri, index + 1)}
                  >
                    <TableCell component="th" scope="row">{index + 1}</TableCell>
                    <TableCell align="left">
                      <Grid container alignItems="center">
                        <Grid item className="playlist__track-image" xs={2}>
                          <img src={getTrackImage(images)} alt=""/>
                        </Grid>
                        <Grid item xs={10}>
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
    );
  }
  return null;
};

export default SpotifyTable;
