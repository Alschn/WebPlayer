"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { axiosClient } from "~/api/AxiosClient";
import type { PlaylistsPage } from "~/api/types";
import { cn } from "~/lib/tailwind";
import "~/styles/globals.css";
import SidebarPlaylistButtonLink from "./SidebarPlaylistButtonLink";

const SidebarPlaylists = ({
  initialData,
  className,
}: {
  initialData: PlaylistsPage;
  className?: string;
}) => {
  const initialPageParams = {
    limit: initialData.limit,
    offset: initialData.offset,
  };

  const query = useInfiniteQuery({
    queryKey: ["playlists"],
    queryFn: async ({ pageParam = initialPageParams }) => {
      const res = await axiosClient.get("/api/spotify/me/playlists/", {
        params: pageParam,
      });
      return res.data as PlaylistsPage;
    },
    initialPageParam: undefined,
    initialData: {
      pages: [initialData],
      pageParams: [initialPageParams],
    },
    getNextPageParam: (lastPage) => {
      const next = lastPage.next;
      if (!next) return;
      const nextUrl = new URL(next);
      const offset = nextUrl.searchParams.get("offset");
      const limit = nextUrl.searchParams.get("limit");
      if (!offset || !limit) return;
      return { limit: Number(limit), offset: Number(offset) };
    },
  });

  const allPlaylists = useMemo(() => {
    if (!query.data) return [];
    return query.data.pages.flatMap((p) => p.items);
  }, [query.data]);

  const handleFetchNextPage = () => {
    void query.fetchNextPage();
  };

  return (
    <div className={cn("flex flex-col pb-3", className)}>
      <InfiniteScroll
        dataLength={allPlaylists.length}
        next={handleFetchNextPage}
        hasMore={Boolean(query.hasNextPage)}
        // todo: loader
        loader={null}
        scrollThreshold={0.9}
        scrollableTarget="sidebar-playlists"
      >
        {allPlaylists.map((p) => (
          <SidebarPlaylistButtonLink
            playlist={p}
            key={"sidebar-playlist-" + p.id}
          />
        ))}
      </InfiniteScroll>
    </div>
  );
};

export default SidebarPlaylists;
