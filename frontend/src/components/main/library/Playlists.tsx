import {Grid} from "@material-ui/core";
import React, {FC, useEffect, useState} from "react";
import InfiniteScroll from "react-infinite-scroll-component";

const Playlists: FC = () => {
  const [savedTracks, setSavedTracks] = useState<any[]>([]);
  const [playlists, setPlaylists] = useState<any[]>([]);
  const [next, setNext] = useState<string | null>(null);

  useEffect(() => {
    // fetch 5-6 saved tracks, number of tracks, name
    // no need to load everything
  }, [])

  useEffect(() => {
    // fetch x first playlists
  });

  const loadMorePlaylists = () => {
    // fetch more playlists on demand
  };

  return (
    <Grid container>
      <Grid item xs={12}>
        <h1>Playlists</h1>
      </Grid>

      <Grid item xs={4} className="library__playlists-saved">

      </Grid>

      <InfiniteScroll
        next={loadMorePlaylists}
        hasMore={next != null}
        loader={<h2>Loading more tracks ...</h2>}
        dataLength={playlists.length}
        scrollableTarget='content'
      >
        {playlists.length > 0 && playlists.map(() => (
          <Grid item xs={2} className="library__playlists-playlist">
            {/* image, name, description */}
          </Grid>
        ))}
      </InfiniteScroll>
    </Grid>
  );
};

export default Playlists;
