import {Grid} from "@mui/material";
import {FC, useEffect, useState} from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import {useHistory} from "react-router-dom";
import AxiosClient from "../../../utils/axiosClient";
import {getArtistsString} from "../../../utils/dataFormat";
import {loadMoreItems} from "../../../utils/api";

const Playlists: FC = () => {
  let history = useHistory();

  const [savedTracks, setSavedTracks] = useState<any[]>([]);
  const [total, setTotal] = useState<number | null>(null);
  const [playlists, setPlaylists] = useState<any[]>([]);
  const [next, setNext] = useState<string | null>(null);

  useEffect(() => {
    AxiosClient.get(
      `http://localhost:8000/api/spotify/playlists`
    ).then(res => {
      const {items, next} = res.data;
      setNext(next);
      setPlaylists(items);
    }).catch(err => console.log(err));
  }, []);

  useEffect(() => {
    AxiosClient.get(
      `http://localhost:8000/api/spotify/saved`
    ).then(res => {
      const {data: {items, total}} = res;
      setSavedTracks(items);
      setTotal(total);
    }).catch(err => console.log(err));
  }, []);

  const loadMorePlaylists = (): void => {
    if (next) loadMoreItems('http://localhost:8000/api/spotify/playlists', next)
      .then(res => {
          const {items, next} = res.data;
          setNext(next);
          setPlaylists(prevState => [...prevState, ...items]);
        }
      ).catch(err => console.log(err));
  };

  const goToPlaylist = (id: string): any => history.push(`/playlists/${id}`);

  const goToFavourite = (): any => history.push('/saved');

  return (
    <InfiniteScroll
      next={loadMorePlaylists}
      hasMore={next != null}
      loader={<h2>Loading more playlists ...</h2>}
      dataLength={playlists.length}
      scrollableTarget="content"
    >
      <Grid container className="library__playlists">
        <Grid item xs={12}>
          <h2>Playlists</h2>
        </Grid>

        <Grid
          item xs={4}
          container
          className="library__playlists-saved"
          onClick={goToFavourite}
        >
          <Grid item xs={12} className="text">
            {savedTracks.length > 0 && savedTracks.map(({track: {name: track_name, artists}}) => (
              <span className="library__playlists-saved-details">
                {getArtistsString(artists) + " "}
                <span>{track_name + " · "}</span>
              </span>
            ))}
          </Grid>
          <Grid item xs={12}>
            <h2>Favourite tracks</h2>
            {total !== null && <p>{total} favourite tracks</p>}
          </Grid>
        </Grid>

        {playlists.length > 0 && playlists.map(({name, description, images, id}) => (
          <Grid item xs={2} container justifyContent="center">
            <div
              className="library__playlists-playlist"
              onClick={() => goToPlaylist(id)}
            >
              <Grid item xs={12} className="library_playlists-playlist-image">
                <img src={images[0].url} alt=""/>
              </Grid>

              <Grid item xs={12} className="library_playlists-playlist-name">
                <p className="text">{name}</p>
              </Grid>

              <Grid item xs={12} className="library_playlists-playlist-desc">
                <p className="text">{description}</p>
              </Grid>
            </div>
          </Grid>
        ))}
      </Grid>
    </InfiniteScroll>
  );
};

export default Playlists;
