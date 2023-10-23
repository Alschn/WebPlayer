import Image from "next/image";
import type { SavedTracksPage } from "~/api/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { getMsToTimeString, relativeTimeFromDates } from "~/lib/format";
import DropdownMoreHorizMenu from "./DropdownMoreHorizMenu";
import NextLink from "next/link";

interface SavedTracksTableProps {
  initialData: SavedTracksPage;
}

const SavedTracksTable = ({ initialData }: SavedTracksTableProps) => {
  const items = initialData.items;

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>#</TableHead>
          <TableHead>Title</TableHead>
          <TableHead>Album</TableHead>
          <TableHead>Date Added</TableHead>
          <TableHead></TableHead>
          <TableHead>Time</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {items.map((item, index) => (
          <TableRow key={`item` + item.track.id + index}>
            <TableCell>{index + 1}</TableCell>
            <TableCell>
              <div className="align-center flex flex-row gap-2">
                <Image
                  src={item.track.album.images[2]?.url ?? ""}
                  alt={item.track.album.name}
                  width={48}
                  height={48}
                />
                <div className="flex flex-col justify-center">
                  <span className="text-base dark:text-white">{item.track.name}</span>
                  <div>
                    {item.track.artists.map((artist, index, array) => (
                      <div
                        key={`track-${item.track.id}-artist-${artist.id}`}
                        className="inline-block"
                      >
                        <NextLink
                          href={`/artists/${artist.id}/`}
                          className="dark:text-gray-400 hover:underline dark:hover:text-white"
                        >
                          {artist.name}
                        </NextLink>
                        {index !== array.length - 1 && (
                          <span className="dark:text-gray-400 mr-1">{", "}</span>
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
                className="dark:text-gray-400 hover:underline dark:hover:text-white"
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
        ))}
      </TableBody>
    </Table>
  );
};

export default SavedTracksTable;
