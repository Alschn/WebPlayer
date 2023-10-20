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
                  <span className="text-base">{item.track.name}</span>
                  <span>
                    {item.track.artists.map((artist) => artist.name).join(", ")}
                  </span>
                </div>
              </div>
            </TableCell>
            <TableCell>{item.track.album.name}</TableCell>
            <TableCell>
              {relativeTimeFromDates(new Date(item.added_at))}
            </TableCell>
            <TableCell></TableCell>
            <TableCell>
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
