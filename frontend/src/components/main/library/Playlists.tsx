import {Grid} from "@mui/material";
import {FC, useState} from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import {useNavigate} from "react-router-dom";
import {getArtistsString} from "../../../utils/dataFormat";
import {useInfiniteQuery} from "@tanstack/react-query";
import {getMyPlaylists} from "../../../api/spotify";
import {getNextPageLimitOffsetParam} from "../../../utils/tanstack-query";

const Playlists: FC = () => {
  const navigate = useNavigate();

  const {
    data
  } = useInfiniteQuery({
    queryKey: ['playlists'],
    queryFn: async ({pageParam = {}}) => {
      const res = await getMyPlaylists(pageParam);
      return res.data;
    },
    getNextPageParam: getNextPageLimitOffsetParam,
    refetchOnWindowFocus: false,
  });

  // const playlists = useMemo(() => {
  //   if (!query.data) return [];
  //   return query.data.pages.flatMap(page => page.items);
  // }, [query.data]);

  const [savedTracks, setSavedTracks] = useState<any[]>([]);
  const [total, setTotal] = useState<number | null>(null);
  const [playlists, setPlaylists] = useState<any[]>([]);
  const [next, setNext] = useState<string | null>(null);

  // useEffect(() => {
  //   getMyPlaylists().then(res => {
  //     const {items, next} = res.data;
  //     setNext(next);
  //     setPlaylists(items);
  //   }).catch(err => console.log(err));
  // }, []);
  //
  // useEffect(() => {
  //   AxiosClient.get(`/spotify/me/albums/`).then(res => {
  //     const {data: {items, total}} = res;
  //     setSavedTracks(items);
  //     setTotal(total);
  //   }).catch(err => console.log(err));
  // }, []);

  const handleLoadMorePlaylists = (): void => {
    // if (next) loadMoreItems('/spotify/playlists', next)
    //   .then(res => {
    //       const {items, next} = res.data;
    //       setNext(next);
    //       setPlaylists(prevState => [...prevState, ...items]);
    //     }
    //   ).catch(err => console.log(err));
  };

  const goToPlaylist = (id: string) => navigate(`/playlists/${id}`);

  const goToFavourite = () => navigate('/saved');

  return (
    <InfiniteScroll
      next={handleLoadMorePlaylists}
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
            {savedTracks.map(({track: {name: track_name, artists}}) => (
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

        {playlists.map(({name, description, images, id}) => (
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
