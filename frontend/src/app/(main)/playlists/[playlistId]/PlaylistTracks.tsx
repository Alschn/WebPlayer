"use client";

import { useMemo } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import type { PlaylistTracksPage } from "~/api/types";
import PlaylistTracksTable from "~/components/tables/PlaylistTracksTable";
import { usePlaylistTracks } from "./usePlaylistTracks";

interface PlaylistsTracksProps {
  initialData: PlaylistTracksPage;
  playlistId: string;
}

export default function PlaylistTracks({
  initialData,
  playlistId,
}: PlaylistsTracksProps) {
  const { data, hasNextPage, fetchNextPage } = usePlaylistTracks(
    playlistId,
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
      <section id="playlist-tracks-table-container">
        <PlaylistTracksTable data={allTracks} />
      </section>
    </InfiniteScroll>
  );
}
