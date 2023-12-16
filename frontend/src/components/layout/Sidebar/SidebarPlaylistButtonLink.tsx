import type { Playlist } from "~/api/types";
import { Button } from "~/components/ui/button";
import { cn } from "~/lib/tailwind";
import NextImage from "next/image";
import NextLink from "next/link";

interface SidebarPlaylistButtonLinkProps {
  playlist: Playlist;
}

function getPlaylistDescription(owner: { display_name: string }) {
  return `Playlist • ${owner.display_name}`;
}

const SidebarPlaylistButtonLink = ({
  playlist,
}: SidebarPlaylistButtonLinkProps) => {
  return (
    <NextLink href={`/playlists/${playlist.id}`} passHref>
      <Button
        variant="ghost"
        className={cn(
          `flex h-[64px] w-full 
          flex-row items-center justify-start 
          gap-3`,
        )}
      >
        <div>
          <NextImage
            src={playlist.images[0]?.url ?? ""}
            alt={playlist.name}
            width={48}
            height={48}
            className="w-[48px] h-[48px]"
          />
        </div>
        <div className="flex flex-col text-left">
          <p className="text-sm">{playlist.name}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {getPlaylistDescription(playlist.owner)}
          </p>
        </div>
      </Button>
    </NextLink>
  );
};

export default SidebarPlaylistButtonLink;
