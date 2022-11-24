import {FC, useEffect, useState} from "react";
import {Grid} from "@mui/material";
import AxiosClient from "../../utils/axiosClient";
import {useNavigate} from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import {SpotifySimplifiedPlaylistObject} from "../../types/spotify";
import {loadMoreItems} from "../../utils/api";

interface SidebarPlaylistsProps {
  newPlaylist?: SpotifySimplifiedPlaylistObject | null,
}

const SidebarPlaylists: FC<SidebarPlaylistsProps> = ({newPlaylist}) => {
  const navigate = useNavigate();
  const [playlists, setPlaylists] = useState<SpotifySimplifiedPlaylistObject[]>([]);
  const [next, setNext] = useState<string | null>(null);

  useEffect(() => {
    AxiosClient.get(
      `/spotify/playlists`
    ).then(res => {
      const {items, next} = res.data;
      setNext(next);
      setPlaylists(items);
    }).catch(err => console.log(err));
  }, []);

  useEffect(() => {
    if (newPlaylist) {
      // whenever new playlist is created, update the list
      setPlaylists(prevState => [newPlaylist, ...prevState]);
    }
  }, [newPlaylist]);

  const loadMorePlaylists = (): void => {
    if (next) {
      loadMoreItems('/spotify/playlists', next)
        .then(res => {
          const {items, next} = res.data;
          setNext(next);
          setPlaylists(prevState => [...prevState, ...items]);
        }).catch(err => console.log(err));
    }
  };

  const goToPlaylistRoute = (playlist_id: string): void => {
    navigate(`/playlists/${playlist_id}`);
  };

  return (
    <Grid className="playlists" id="sidebar-playlists">
      <InfiniteScroll
        next={loadMorePlaylists}
        hasMore={next != null}
        loader={<p>Loading more playlists ...</p>}
        dataLength={playlists.length}
        scrollableTarget="sidebar-playlists"
      >
        {playlists && playlists.map(
          ({name, id, collaborative}, index) => (
            <p className="playlist-item"
               key={`playlist-item-${index}`}
               onClick={() => goToPlaylistRoute(id)}
            >
              {name}
            </p>
          )
        )}
      </InfiniteScroll>
    </Grid>
  );
};

export default SidebarPlaylists;
