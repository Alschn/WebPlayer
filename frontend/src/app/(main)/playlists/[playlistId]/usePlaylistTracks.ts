import { useInfiniteQuery } from "@tanstack/react-query";
import { axiosClient } from "~/api/AxiosClient";
import type { PlaylistTracksPage } from "~/api/types";
import { getNextPageLimitOffsetParams } from "~/lib/tanstack-query";

export function getPlaylistTracks(
  playlistId: string,
  params?: { limit: number; offset: number },
) {
  return axiosClient.get<PlaylistTracksPage>(
    `/api/spotify/playlists/${playlistId}/tracks/`,
    {
      params: params,
    },
  );
}

export const usePlaylistTracks = (
  playlistId: string,
  initialData: PlaylistTracksPage,
) => {
  const initialPageParams = {
    limit: initialData.limit,
    offset: initialData.offset,
  };
  return useInfiniteQuery({
    queryKey: [`playlist-${playlistId}-tracks`],
    queryFn: async ({ pageParam = initialPageParams }) => {
      const res = await getPlaylistTracks(playlistId, pageParam);
      return res.data;
    },
    initialPageParam: initialPageParams,
    initialData: {
      pages: [initialData],
      pageParams: [initialPageParams],
    },
    getNextPageParam: getNextPageLimitOffsetParams,
  });
};
