"use client";

import InfiniteScroll from "react-infinite-scroll-component";
import type { TracksPage } from "~/api/types";
import AlbumTracksTable from "~/components/tables/AlbumTracksTable";
import { useAlbumTracks } from "./useAlbumTracks";
import { useMemo } from "react";

interface AlbumTracksProps {
  initialData: TracksPage;
  albumId: string;
}

export default function AlbumTracks({
  albumId,
  initialData,
}: AlbumTracksProps) {
  const { data, hasNextPage, fetchNextPage } = useAlbumTracks(
    albumId,
    initialData,
  );

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
      <section id="album-tracks-table-container">
        <AlbumTracksTable data={initialData.items} />
      </section>
    </InfiniteScroll>
  );
}
