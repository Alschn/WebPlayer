import { useInfiniteQuery } from "@tanstack/react-query";
import { axiosClient } from "~/api/AxiosClient";
import type { TracksPage } from "~/api/types";
import { getNextPageLimitOffsetParams } from "~/lib/tanstack-query";

export function getAlbumTracks(
  albumId: string,
  params?: { limit: number; offset: number },
) {
  return axiosClient.get<TracksPage>(`/api/spotify/albums/${albumId}/tracks/`, {
    params: params,
  });
}

export const useAlbumTracks = (albumId: string, initialData: TracksPage) => {
  const initialPageParams = {
    limit: initialData.limit,
    offset: initialData.offset,
  };

  return useInfiniteQuery({
    queryKey: ["album-tracks", albumId],
    queryFn: async ({ pageParam = initialPageParams }) => {
      const res = await getAlbumTracks(albumId, pageParam);
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
