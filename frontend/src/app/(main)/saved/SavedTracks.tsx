"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { axiosClient } from "~/api/AxiosClient";
import type { SavedTracksPage } from "~/api/types";
import SavedTracksTable from "~/components/tables/SavedTracksTable";
import { getNextPageLimitOffsetParams } from "~/lib/tanstack-query";

interface SavedTracksProps {
  initialData: SavedTracksPage;
}

function getSavedTracks(params?: { limit: number; offset: number }) {
  return axiosClient.get("/api/spotify/me/tracks/", {
    params: params,
  });
}

export default function SavedTracks({ initialData }: SavedTracksProps) {
  const initialPageParams = {
    limit: initialData.limit,
    offset: initialData.offset,
  };

  const query = useInfiniteQuery({
    queryKey: ["saved-tracks"],
    queryFn: async ({ pageParam = initialPageParams }) => {
      const res = await getSavedTracks(pageParam);
      return res.data as SavedTracksPage;
    },
    initialPageParam: initialPageParams,
    initialData: {
      pages: [initialData],
      pageParams: [initialPageParams],
    },
    getNextPageParam: getNextPageLimitOffsetParams,
  });

  const allTracks = useMemo(() => {
    if (!query.data) return [];
    return query.data.pages.flatMap((p) => p.items);
  }, [query.data]);

  const handleFetchNextPage = () => {
    void query.fetchNextPage();
  };

  return (
    <InfiniteScroll
      dataLength={allTracks.length}
      hasMore={Boolean(query.hasNextPage)}
      next={handleFetchNextPage}
      loader={<></>}
      scrollThreshold={0.9}
      scrollableTarget="main"
    >
      <section id="saved-tracks-table-container">
        <SavedTracksTable data={allTracks} />
      </section>
    </InfiniteScroll>
  );
}
