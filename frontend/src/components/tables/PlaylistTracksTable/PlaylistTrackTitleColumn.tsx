import NextImage from "next/image";
import NextLink from "next/link";
import type { PlaylistTrack } from "~/api/types";

interface PlaylistTitleColumnProps {
  track: PlaylistTrack["track"];
}

const PlaylistTrackTitleColumn = ({ track }: PlaylistTitleColumnProps) => {
  return (
    <div className="align-center flex flex-row gap-2">
      <NextImage
        src={track.album.images?.[0]?.url ?? ""}
        alt={track.album.name}
        width={48}
        height={48}
      />
      <div className="flex flex-col justify-center">
        <span className="line-clamp-1 text-base dark:text-white">
          {track.name}
        </span>
        <div>
          {track.artists.map((artist, index, array) => (
            <div
              key={`track-${track.id}-artist-${artist.id}`}
              className="inline-block"
            >
              <NextLink
                href={`/artists/${artist.id}/`}
                className="hover:underline dark:text-stone-400 dark:hover:text-white"
              >
                {artist.name}
              </NextLink>
              {index !== array.length - 1 && (
                <span className="mr-1 dark:text-stone-400">{", "}</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PlaylistTrackTitleColumn;
