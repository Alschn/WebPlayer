import {Grid} from "@mui/material";
import {FC, useMemo, useState} from "react";
import {Link, useParams} from "react-router-dom";
import {getMsToTime} from "../../utils/dataFormat";
import {
  SpotifyExternalUrlObject,
  SpotifyFollowersObject,
  SpotifyImageObject,
  SpotifyPlaylistObject,
  SpotifyPublicUserObject
} from "../../types/spotify";
import SpotifyTable from "../layout/SpotifyTable";
import EditPlaylistDialog from "./playlist/EditPlaylistDialog";
import {getPlaylist, getPlaylistTracks} from "../../api/spotify";
import useAuth from "../../hooks/useAuth";
import {useInfiniteQuery, useQuery} from "@tanstack/react-query";

export interface SpotifyPlaylistInfo {
  collaborative: boolean,
  description: string,
  external_urls: SpotifyExternalUrlObject,
  followers: SpotifyFollowersObject,
  href: string,
  id: string,
  images: SpotifyImageObject[],
  name: string,
  owner: SpotifyPublicUserObject,
  primary_color?: string,
  public: boolean,
  snapshot_id?: string,
  type: string,
  uri: string,
}

const Playlist: FC = () => {
  let {playlist_id} = useParams();
  const playlistId = playlist_id as string;

  const {user} = useAuth();
  const userId = user?.id as string;

  const {
    data: playlistData
  } = useQuery({
    queryKey: ['playlist', playlistId] as const,
    queryFn: async ({queryKey}) => {
      const res = await getPlaylist(queryKey[1]);
      return res.data as SpotifyPlaylistObject;
    },
  });

  const {
    data: tracksData,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: ['playlist', playlistId, 'tracks'] as const,
    queryFn: async ({pageParam = {}}) => {
      const res = await getPlaylistTracks(playlistId, pageParam);
      return res.data;
    },
    getNextPageParam: (lastPage) => {
      const next = lastPage.next;
      if (!next) return undefined;
      const url = new URL(next);
      const limit = url.searchParams.get('limit');
      const offset = url.searchParams.get('offset');
      return {limit, offset};
    },
    // initialData: () => {
    //   if (!playlistData) return;
    //
    //   return {
    //     pages: [
    //       playlistData!.tracks
    //     ],
    //     pageParams: [{}]
    //   };
    // },
    enabled: Boolean(playlistData),
    refetchOnWindowFocus: false,
  });

  const tracks = useMemo(() => {
    if (!tracksData) return [];
    return tracksData.pages.flatMap(page => page.items);
  }, [tracksData]);

  const totalCount = useMemo(() => {
    return tracksData?.pages[0]?.total || 0;
  }, [tracksData]);

  // edit playlist dialog
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const loadMoreTracks = async () => {
    if (!hasNextPage) return;

    await fetchNextPage();
  };

  const getPlaylistLength = (): string => {
    if (!tracks) return '';

    const length = tracks.reduce(
      (acc, {track: {duration_ms}}) => acc + duration_ms,
      0
    );

    return getMsToTime(length);
  };

  const isOwner = playlistData && playlistData.owner.id === userId;

  const handleOpen = () => {
    if (!isOwner) return;
    setIsOpen(true);

  };
  const handleClose = () => {
    if (!isOwner) return;
    setIsOpen(false);

  };

  return (
    <div className="playlist__root">
      {!!playlistData && (
        <Grid container alignItems="flex-end">
          <EditPlaylistDialog
            open={isOpen}
            handleClose={handleClose}
            playlistInfo={playlistData}
          />
          <Grid item className="playlist__info-left">
            <img
              src={playlistData?.images[0]?.url}
              width={300}
              height={300}
              alt={playlistData?.name ?? ""}
            />
          </Grid>
          <Grid item className="playlist__info-right">
            <h4>PLAYLIST</h4>
            <h1 onClick={handleOpen} className={isOwner ? "playlist-owner-hover" : ""}>
              {playlistData?.name}
            </h1>
            <p className={
              isOwner ?
                "playlist__info-right__description playlist-owner-hover" :
                "playlist__info-right__description"
            }
               onClick={handleOpen}
            >
              {playlistData?.description}
            </p>
            <p className="playlist__info-right__stats">
              <Link
                to={`/profiles/${playlistData?.owner.id}`}
              >{playlistData?.owner.display_name}
              </Link>
              · {playlistData?.followers.total} likes
              · {totalCount} tracks, {getPlaylistLength()}
            </p>
          </Grid>
        </Grid>
      )}
      <Grid item xs={12} className="playlist__tracks">
        <SpotifyTable
          tableType="playlist"
          tracks={tracks}
          hasNextPage={Boolean(hasNextPage)}
          loadMore={loadMoreTracks}
        />
      </Grid>
      <div className="playlist__recommended">
        {/* todo */}
      </div>
    </div>
  );
};

export default Playlist;
