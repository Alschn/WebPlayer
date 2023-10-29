import { useInfiniteQuery } from "@tanstack/react-query";
import { axiosClient } from "~/api/AxiosClient";
import type { SavedTracksPage } from "~/api/types";
import { getNextPageLimitOffsetParams } from "~/lib/tanstack-query";

export function getSavedTracks(params?: { limit: number; offset: number }) {
  return axiosClient.get<SavedTracksPage>("/api/spotify/me/tracks/", {
    params: params,
  });
}

export const useSavedTracks = (initialData: SavedTracksPage) => {
  const initialPageParams = {
    limit: initialData.limit,
    offset: initialData.offset,
  };

  return useInfiniteQuery({
    queryKey: ["saved-tracks"],
    queryFn: async ({ pageParam = initialPageParams }) => {
      const res = await getSavedTracks(pageParam);
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
