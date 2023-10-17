import {Grid} from "@mui/material";
import {FC, useEffect, useState} from "react";
import InfiniteScroll from "react-infinite-scroll-component";

const Albums: FC = () => {
  const [albums, setAlbums] = useState<any[]>([]);
  const [next, setNext] = useState<string | null>(null);

  useEffect(() => {
    // fetch albums
  }, [])

  const loadMoreAlbums = () => {
    // fetch more albums
  };

  return (
    <Grid container className="library__albums">
      <Grid item xs={12}>
        <h1>Albums</h1>
      </Grid>

      <InfiniteScroll
        next={loadMoreAlbums}
        hasMore={next != null}
        loader={<h2>Loading more albums ...</h2>}
        dataLength={albums.length}
        scrollableTarget='content'
      >
        {albums.length > 0 && albums.map(() => (
          <Grid item xs={2} className="library__albums-album">
            {/* image, album name, artists, design same as in playlists*/}
          </Grid>
        ))}
      </InfiniteScroll>
    </Grid>
  );
};

export default Albums;
