import React, {FC, useState} from "react";
import {Grid, Table, TableBody, TableCell, TableContainer, TableRow} from "@mui/material";
import ExplicitIcon from "@mui/icons-material/Explicit";
import {getTrackImage} from "../../utils/formatComponents";
import {getMsToTime} from "../../utils/dataFormat";
import useSingleAndDoubleClick from "../../hooks/useSingleAndDoubleClick";
import {playSongWithUri} from "../player/api";
import {usePlaybackState} from "react-spotify-web-playback-sdk";
import {SpotifyTrackObject} from "../../types/spotify";


interface SpotifyTableProps {
  tracks: SpotifyTrackObject[],
}

const SpotifyArtistTable: FC<SpotifyTableProps> = ({tracks}) => {
  const [selected, setSelected] = useState<Element | null>(null);

  const playbackState = usePlaybackState();

  const handleSingleClick = (index: number): void => {
    // to be changed !
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
      .then(() => console.log(`Playing song with uri ${row}, context ${playbackState?.context.uri}`));
  };

  const handleClick = useSingleAndDoubleClick(handleSingleClick, handleDoubleClick);

  if (tracks.length === 0) return null;

  return (
    <TableContainer>
      <Table aria-label="artist-top-tracks-table" size="small">
        <TableBody>
          {tracks.map(
            ({artists, duration_ms, name, explicit, uri, album}, index) => (
              <TableRow
                key={`track-${index}`}
                className="playlist__track-row"
                id={`track-${index + 1}`}
                onClick={() => handleClick(uri, index + 1)}
              >
                <TableCell component="th" scope="row" style={{width: 40}}>{index + 1}</TableCell>
                <TableCell align="left">
                  <Grid container alignItems="center">
                    <Grid item className="playlist__track-image" xs={1}>
                      <img src={getTrackImage(album.images)} alt="" width={40} height={40}/>
                    </Grid>
                    <Grid item>
                      <Grid item className="playlist__track-title">
                        <span>{name}</span>
                      </Grid>
                      <Grid item className="playlist__track-artists">
                        {explicit && <ExplicitIcon/>}
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
    </TableContainer>
  );
};

export default SpotifyArtistTable;
