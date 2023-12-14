import type { Track } from "~/api/types";
import { TableRow, TableCell } from "~/components/ui/table";
import { getMsToTimeString } from "~/lib/format";
import DropdownMoreHorizMenu from "../SavedTracksTable/DropdownMoreHorizMenu";
import NextLink from "next/link";

interface AlbumTracksTableRowProps {
  item: Track;
  index: number;
}

export default function AlbumTracksTableRow({
  item,
  index,
}: AlbumTracksTableRowProps) {
  return (
    <TableRow>
      <TableCell>{index + 1}</TableCell>
      <TableCell>
        <div className="align-center flex flex-row gap-2">
          <div className="flex flex-col justify-center">
            <span className="text-base dark:text-white">{item.name}</span>
            <div>
              {item.artists.map((artist, index, array) => (
                <div
                  key={`track-${item.id}-artist-${artist.id}`}
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
      <TableCell></TableCell>
      <TableCell className="dark:text-gray-400">
        {getMsToTimeString(item.duration_ms, true)}
      </TableCell>
      <TableCell>
        <DropdownMoreHorizMenu />
      </TableCell>
    </TableRow>
  );
}
