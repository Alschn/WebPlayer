import {FC, useMemo} from "react";
import {Grid} from "@mui/material";
import {Link} from "react-router-dom";
import FavoriteIcon from "@mui/icons-material/Favorite";
import SpotifyTable from "../layout/SpotifyTable";
import {getSavedTracks} from "../../api/spotify";
import {useInfiniteQuery} from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import {getNextPageLimitOffsetParam} from "../../utils/tanstack-query";

const SavedTracks: FC = () => {
  const {user} = useAuth();

  const {
    isLoading,
    data,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: ['saved-tracks'],
    queryFn: async ({pageParam = {limit: undefined, offset: undefined}}) => {
      const res = await getSavedTracks(pageParam);
      return res.data;
    },
    getNextPageParam: getNextPageLimitOffsetParam
  });

  const tracks = useMemo(() => {
    if (!data) return [];
    return data.pages.flatMap(page => page.items);
  }, [data]);

  const total = useMemo(() => {
    if (!data) return null;
    return data.pages[0]?.total ?? null;
  }, [data]);

  const loadMoreTracks = () => {
    if (!hasNextPage) return;
    void fetchNextPage();
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
          {user && (
            <p className="playlist__info-right__stats">
              <img src={user.images[0].url} alt=""/>
              <Link to={`/profiles/${user.id}`}>
                {user.display_name}
              </Link>
              · {total} tracks
            </p>
          )}
        </Grid>
      </Grid>

      <Grid item xs={12} className="playlist__tracks">
        <SpotifyTable
          tableType="playlist"
          tracks={tracks}
          hasNextPage={Boolean(hasNextPage)}
          loadMore={loadMoreTracks}
        />
      </Grid>
    </div>
  );
};

export default SavedTracks;
