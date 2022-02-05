import {FC, useContext, useEffect, useState} from "react";
import {Grid} from "@mui/material";
import {Link} from "react-router-dom";
import UserContext from "../../context/userContext";
import AxiosClient from "../../utils/axiosClient";
import FavoriteIcon from "@mui/icons-material/Favorite";
import SpotifyTable from "../layout/SpotifyTable";

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
        <SpotifyTable
          tableType="playlist"
          tracks={tracks}
          next={next}
          loadMore={loadMoreTracks}
        />
      </Grid>
    </div>
  );
};

export default SavedTracks;
