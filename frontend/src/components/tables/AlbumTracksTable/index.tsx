import type { TracksPage } from "~/api/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { getMsToTimeString } from "~/lib/format";
import NextLink from "next/link";
import DropdownMoreHorizMenu from "../SavedTracksTable/DropdownMoreHorizMenu";

interface AlbumTracksTableProps {
  initialData: TracksPage;
}

const AlbumTracksTable = ({ initialData }: AlbumTracksTableProps) => {
  const items = initialData.items;

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[40px]">#</TableHead>
          <TableHead >Title</TableHead>
          <TableHead></TableHead>
          <TableHead>Time</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {items.map((item, index) => (
          <TableRow key={`item` + item.id + index}>
            <TableCell>{index + 1}</TableCell>
            <TableCell>
              <div className="align-center flex flex-row gap-2">
                <div className="flex flex-col justify-center">
                  <span className="text-base dark:text-white">
                    {item.name}
                  </span>
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
                          <span className="mr-1 dark:text-gray-400">
                            {", "}
                          </span>
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
        ))}
      </TableBody>
    </Table>
  );
};

export default AlbumTracksTable;
