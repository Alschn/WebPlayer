import React, {FC, useEffect, useState} from "react";
import {Grid} from "@material-ui/core";
import AxiosClient from "../../utils/axiosClient";
import {useHistory} from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import {SpotifyImageObject, SpotifyPublicUserObject} from "../../types/spotify";

interface SpotifyPlaylist {
  collaborative: boolean,
  description: string,
  external_urls: {
    spotify: string
  },
  href: string,
  id: string,
  images: SpotifyImageObject[],
  name: string,
  owner: SpotifyPublicUserObject,
}

const SidebarPlaylists: FC = () => {
  let history = useHistory();
  const [playlists, setPlaylists] = useState<SpotifyPlaylist[]>([]);
  const [next, setNext] = useState<string | null>(null);

  useEffect(() => {
    AxiosClient.get(
      `http://localhost:8000/api/spotify/playlists`
    ).then(res => {
      const {items, next} = res.data;
      setNext(next);
      setPlaylists(items);
    }).catch(err => console.log(err));
  }, [])

  const loadMoreItems = (): void => {
    if (next) {
      AxiosClient.put(
        `http://localhost:8000/api/spotify/playlists`,
        {
          next: next
        }
      ).then(res => {
        const {items, next} = res.data;
        setNext(next);
        setPlaylists(prevState => [...prevState, ...items]);
      }).catch(err => console.log(err));
    }
  };

  const goToPlaylistRoute = (playlist_url: string): void => {
    history.push(`/playlists/${playlist_url}`);
  }

  return (
    <Grid className="playlists" id="sidebar-playlists">
      <InfiniteScroll
        next={loadMoreItems}
        hasMore={next != null}
        loader={<p>Loading more playlists ...</p>}
        dataLength={playlists.length}
        scrollableTarget='sidebar-playlists'
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
  )
}

export default SidebarPlaylists;
