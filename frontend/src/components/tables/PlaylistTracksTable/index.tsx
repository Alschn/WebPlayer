import type { PlaylistTrack } from "~/api/types";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import PlaylistTracksTableRow from "./PlaylistTracksTableRow";

interface PlaylistTracksTableProps {
  data: PlaylistTrack[];
}

const PlaylistTracksTable = ({ data }: PlaylistTracksTableProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[40px]">#</TableHead>
          <TableHead>Title</TableHead>
          <TableHead>Album</TableHead>
          <TableHead>Date Added</TableHead>
          <TableHead></TableHead>
          <TableHead>Time</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item, index) => (
          <PlaylistTracksTableRow
            key={`item-${item.track.id}-${index}`}
            item={item}
            index={index}
          />
        ))}
      </TableBody>
    </Table>
  );
};

export default PlaylistTracksTable;
