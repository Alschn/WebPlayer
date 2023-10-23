"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import NextImage from "next/image";
import NextLink from "next/link";
import { useMemo } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { axiosClient } from "~/api/AxiosClient";
import type { PlaylistsPage } from "~/api/types";
import { Button } from "~/components/ui/button";
import { cn } from "~/lib/tailwind";
import "~/styles/globals.css";

function getPlaylistDescription(owner: { display_name: string }) {
  return `Playlist • ${owner.display_name}`;
}

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
      return { limit: lastPage.limit, offset: lastPage.offset };
    },
  });

  const allPlaylists = useMemo(() => {
    if (!query.data) return [];
    return query.data.pages.flatMap((p) => p.items);
  }, [query.data]);

  const handleFetchNextPage = () => {
    void query.fetchNextPage();
  };

  // todo: fix broken infinite scroll

  return (
    <InfiniteScroll
      dataLength={allPlaylists.length}
      next={handleFetchNextPage}
      hasMore={Boolean(query.hasNextPage)}
      loader={<h4>Loading...</h4>}
      scrollThreshold={0.9}
      scrollableTarget="sidebar-playlists"
    >
      <div
        id="sidebar-playlists"
        className={cn("flex flex-col pb-3", className)}
      >
        {allPlaylists.map((p) => (
          <NextLink
            href={`/playlists/${p.id}`}
            passHref
            key={"sidebar-playlist-" + p.id}
          >
            <Button
              variant="ghost"
              className={cn(
                `flex h-[64px] w-full flex-row items-center justify-start gap-3`,
              )}
            >
              <div>
                <NextImage
                  src={p.images[0]?.url ?? ""}
                  alt={p.name}
                  width={48}
                  height={48}
                />
              </div>
              <div className="flex flex-col text-left">
                <p className="text-sm">{p.name}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {getPlaylistDescription(p.owner)}
                </p>
              </div>
            </Button>
          </NextLink>
        ))}
      </div>
    </InfiniteScroll>
  );
};

export default SidebarPlaylists;
