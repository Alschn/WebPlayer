import type { SavedTrackItem } from "~/api/types";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import SavedTrackTableRow from "./SavedTrackTableRow";

interface SavedTracksTableProps {
  data: SavedTrackItem[];
}

export default function SavedTracksTable({ data }: SavedTracksTableProps) {
  return (
    <Table id="saved-tracks-table">
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
          <SavedTrackTableRow
            key={`saved-track-` + item.track.id + index}
            item={item}
            index={index}
          />
        ))}
      </TableBody>
    </Table>
  );
}
