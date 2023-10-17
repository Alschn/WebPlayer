import {FC, useMemo} from "react";
import {Grid} from "@mui/material";
import {useNavigate} from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import {SpotifySimplifiedPlaylistObject} from "../../types/spotify";
import {getMyPlaylists} from "../../api/spotify";
import {useInfiniteQuery} from "@tanstack/react-query";

interface SidebarPlaylistsProps {
  newPlaylist?: SpotifySimplifiedPlaylistObject | null,
}

const getPageParams = (href: string | null) => {
  if (!href) return;
  const url = new URL(href);
  const offset = url.searchParams.get('offset') ?? undefined;
  const limit = url.searchParams.get('limit') ?? undefined;
  return {offset, limit};
};

const SidebarPlaylists: FC<SidebarPlaylistsProps> = ({newPlaylist}) => {
  const navigate = useNavigate();

  const query = useInfiniteQuery({
    queryKey: ['current-user-playlists'],
    queryFn: async ({pageParam}) => {
      const res = await getMyPlaylists(pageParam);
      return res.data;
    },
    getNextPageParam: (lastPage) => {
      return getPageParams(lastPage.next);
    },
    getPreviousPageParam: (firstPage) => {
      return getPageParams(firstPage.previous);
    },
    refetchOnWindowFocus: false,
  });

  const playlists = useMemo(() => {
    if (!query.data) return [];
    return query.data.pages.flatMap((page) => page.items);
  }, [query.data]);

  const loadMorePlaylists = async () => {
    if (!query.hasNextPage) return;
    await query.fetchNextPage();
  };

  const goToPlaylistRoute = (playlist_id: string) => {
    navigate(`/playlists/${playlist_id}`);
  };

  return (
    <Grid className="playlists" id="sidebar-playlists">
      <InfiniteScroll
        next={loadMorePlaylists}
        hasMore={Boolean(query.hasNextPage)}
        loader={<p>Loading more playlists ...</p>}
        dataLength={playlists.length}
        scrollableTarget="sidebar-playlists"
      >
        {playlists.map(
          ({name, id, collaborative}, index) => (
            <p
              className="playlist-item"
              key={`playlist-item-${index}-${id}`}
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
