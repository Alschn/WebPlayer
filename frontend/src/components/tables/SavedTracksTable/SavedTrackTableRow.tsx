import Image from "next/image";
import type { SavedTrackItem } from "~/api/types";
import { TableCell, TableRow } from "~/components/ui/table";
import { getMsToTimeString, relativeTimeFromDates } from "~/lib/format";
import DropdownMoreHorizMenu from "./DropdownMoreHorizMenu";
import NextLink from "next/link";

export default function SavedTrackTableRow({
  item,
  index,
}: {
  item: SavedTrackItem;
  index: number;
}) {
  return (
    <TableRow>
      <TableCell>{index + 1}</TableCell>
      <TableCell>
        <div className="align-center flex flex-row gap-2">
          <Image
            src={item.track.album.images[2]?.url ?? ""}
            alt={item.track.album.name}
            width={48}
            height={48}
            className="h-[48px] w-[48px]"
          />
          <div className="flex flex-col justify-center">
            <span className="line-clamp-1 text-base dark:text-white">
              {item.track.name}
            </span>
            <div>
              {item.track.artists.map((artist, index, array) => (
                <div
                  key={`track-${item.track.id}-artist-${artist.id}`}
                  className="inline-block"
                >
                  <NextLink
                    href={`/artists/${artist.id}/`}
                    className="hover:underline dark:text-gray-400 dark:hover:text-white"
                  >
                    {artist.name}
                  </NextLink>
                  {index !== array.length - 1 && (
                    <span className="mr-1 dark:text-gray-400">{", "}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </TableCell>
      <TableCell>
        <NextLink
          href={`/albums/${item.track.album.id}/`}
          className="line-clamp-1 hover:underline dark:text-gray-400 dark:hover:text-white"
        >
          {item.track.album.name}
        </NextLink>
      </TableCell>
      <TableCell className="dark:text-gray-400">
        {relativeTimeFromDates(new Date(item.added_at))}
      </TableCell>
      <TableCell></TableCell>
      <TableCell className="dark:text-gray-400">
        {getMsToTimeString(item.track.duration_ms, true)}
      </TableCell>
      <TableCell>
        <DropdownMoreHorizMenu />
      </TableCell>
    </TableRow>
  );
}
