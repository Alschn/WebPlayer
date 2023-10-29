import type { Track } from "~/api/types";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import AlbumTracksTableRow from "./AlbumTracksTableRow";

interface AlbumTracksTableProps {
  data: Track[];
}

const AlbumTracksTable = ({ data }: AlbumTracksTableProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[40px]">#</TableHead>
          <TableHead>Title</TableHead>
          <TableHead></TableHead>
          <TableHead>Time</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item, index) => (
          <AlbumTracksTableRow key={item.id} item={item} index={index} />
        ))}
      </TableBody>
    </Table>
  );
};

export default AlbumTracksTable;
