import {FC, useMemo} from "react";
import {Link, useParams} from "react-router-dom";
import {Grid} from "@mui/material";
import {getPlaylistLength} from "../../utils/dataFormat";
import SpotifyTable from "../layout/SpotifyTable";
import {getAlbum, getAlbumTracks} from "../../api/spotify";
import {useInfiniteQuery, useQuery} from "@tanstack/react-query";


const Album: FC = () => {
  const {id} = useParams();
  const albumId = id as string;

  const {
    data: albumData,
  } = useQuery({
    queryKey: ['album', albumId] as const,
    queryFn: async ({queryKey}) => {
      const res = await getAlbum(queryKey[1]);
      return res.data;
    },
  });

  const {
    data: tracksData,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: ['album', albumId, 'tracks'] as const,
    queryFn: async ({queryKey, pageParam = {}}) => {
      const res = await getAlbumTracks(queryKey[1], pageParam);
      return res.data;
    },
    getNextPageParam: (lastPage) => {
      const {next} = lastPage;
      if (!next) return undefined;
      const url = new URL(next);
      const limit = url.searchParams.get('limit');
      const offset = url.searchParams.get('offset');
      return {limit, offset};
    },
    enabled: Boolean(albumData),
  });

  const artists = useMemo(() => {
    return albumData?.artists || [];
  }, [albumData]);

  const tracks = useMemo(() => {
    return tracksData?.pages.flatMap(page => page.items) ?? [];
  }, [tracksData]);


  const loadMoreTracks = async () => {
    if (!hasNextPage) return;
    await fetchNextPage();
  };

  return (
    <div className="playlist__root">
      {albumData && tracks && (
        <Grid container alignItems="flex-end">
          <Grid item className="playlist__info-left">
            <img
              src={albumData?.images[0]?.url}
              alt="playlist-img"
              width={300}
              height={300}
            />
          </Grid>

          <Grid item className="playlist__info-right">
            <h4>ALBUM</h4>
            <h1 id="album-title">{albumData.name}</h1>
            <p className="playlist__info-right__stats">
              <Link to="/">
                {artists[0]?.url}
              </Link>
              · {albumData.total_tracks} tracks, {getPlaylistLength(tracks)}
            </p>
          </Grid>
        </Grid>
      )}

      <Grid item xs={12} className="playlist__tracks">
        <SpotifyTable
          tableType="album"
          tracks={tracks}
          hasNextPage={Boolean(hasNextPage)}
          loadMore={loadMoreTracks}
        />
      </Grid>
    </div>
  );
};

export default Album;
