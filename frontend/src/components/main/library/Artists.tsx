import {Grid} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import InfiniteScroll from "react-infinite-scroll-component";

const Artists = () => {
  const [artists, setArtists] = useState<any[]>([]);
  const [next, setNext] = useState<string | null>(null);

  useEffect(() => {
    // fetch first artists
  }, [])

  const loadMoreArtists = () => {
    // fetch more artists
  };

  return (
    <Grid container className="library__artists">
      <Grid item xs={12}>
        <h1>Artists</h1>
      </Grid>

      <InfiniteScroll
        next={loadMoreArtists}
        hasMore={next != null}
        loader={<h2>Loading more artists...</h2>}
        dataLength={artists.length}
        scrollableTarget='content'
      >
        {artists.length > 0 && artists.map(() => (
          <Grid item xs={2} className="library__artists-artist">
          {/* round image, artist name, description=artist */}
          </Grid>
        ))}
      </InfiniteScroll>
    </Grid>
  );
};

export default Artists;
