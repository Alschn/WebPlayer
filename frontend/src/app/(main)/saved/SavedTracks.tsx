"use client";

import { useMemo } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import type { SavedTracksPage } from "~/api/types";
import SavedTracksTable from "~/components/tables/SavedTracksTable";
import { useSavedTracks } from "./useSavedTracks";

interface SavedTracksProps {
  initialData: SavedTracksPage;
}

export default function SavedTracks({ initialData }: SavedTracksProps) {
  const { data, hasNextPage, fetchNextPage } = useSavedTracks(initialData);

  const allTracks = useMemo(() => {
    if (!data) return [];
    return data.pages.flatMap((p) => p.items);
  }, [data]);

  const handleFetchNextPage = () => {
    void fetchNextPage();
  };

  return (
    <InfiniteScroll
      dataLength={allTracks.length}
      hasMore={Boolean(hasNextPage)}
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
