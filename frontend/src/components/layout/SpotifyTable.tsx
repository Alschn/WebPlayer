import {FC, useState} from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import {Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ExplicitIcon from "@mui/icons-material/Explicit";
import {getArtistsWithLinks, getTrackImage} from "../../utils/formatComponents";
import {getMsToTime, getTimePassedSinceAdded} from "../../utils/dataFormat";
import {Link} from "react-router-dom";
import useSingleAndDoubleClick from "../../hooks/useSingleAndDoubleClick";
import {usePlaybackState} from "react-spotify-web-playback-sdk";
import {playSongWithUri} from "../../api/spotify";


interface SpotifyTableProps {
  tableType: SpotifyTableType,
  tracks: any[],
  hasNextPage: boolean;
  loadMore: () => void;
}

type SpotifyTableType = "album" | "playlist";

const SpotifyTable: FC<SpotifyTableProps> = ({hasNextPage, tracks, loadMore, tableType}) => {
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

    playSongWithUri(row).then(() => {
      console.log(`Playing song with uri ${row}; context ${playbackState?.context.uri}`);
    });
  };

  const handleClick = useSingleAndDoubleClick(handleSingleClick, handleDoubleClick);

  if (tracks.length === 0) return null;

  if (tableType === 'album') {
    return (
      <TableContainer>
        <InfiniteScroll
          next={loadMore}
          hasMore={hasNextPage}
          loader={<h2>Loading more tracks ...</h2>}
          dataLength={tracks.length}
          scrollThreshold={0.9}
          scrollableTarget="content"
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
                    key={`album-track-${index}-${uri}`}
                    id={`track-${index + 1}`}
                    className="playlist__track-row"
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
          hasMore={hasNextPage}
          loader={<h2>Loading more tracks ...</h2>}
          dataLength={tracks.length}
          scrollableTarget="content"
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
                    key={`playlist-track-${index}-${uri}`}
                    id={`track-${index + 1}`}
                    className="playlist__track-row"
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
