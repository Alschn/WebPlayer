import NextImage from "next/image";
import NextLink from "next/link";
import type { Track } from "~/api/types";
import { cn } from "~/lib/tailwind";
// import { usePlaybackState } from "react-spotify-web-playback-sdk";

interface PlaylistTitleColumnProps {
  track: Track;
}

const PlaylistTrackTitleColumn = ({ track }: PlaylistTitleColumnProps) => {
  // playbackState?.track_window.current_track.uri === track.uri
  const isPlaying = false;

  return (
    <div className="align-center flex flex-row gap-2">
      <NextImage
        src={track.album.images?.[0]?.url ?? ""}
        alt={track.album.name}
        width={48}
        height={48}
      />
      <div className="flex flex-col justify-center">
        <span
          className={cn(
            "line-clamp-1 text-base dark:text-white",
            isPlaying && "text-green-700 dark:text-green-400",
          )}
        >
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
