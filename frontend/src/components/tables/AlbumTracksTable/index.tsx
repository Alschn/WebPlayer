"use client";

import type { Track } from "~/api/types";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import AlbumTracksTableRow from "./AlbumTracksTableRow";
import { useRef } from "react";
import { playSong } from "~/api/player";
import { useToast } from "~/components/ui/use-toast";
import { useClickOutside } from "~/hooks/useClickOutside";
import { useSelectRow } from "~/hooks/useSelectedRow";

interface AlbumTracksTableProps {
  data: Track[];
}

const AlbumTracksTable = ({ data }: AlbumTracksTableProps) => {
  const { toast } = useToast();
  const {
    selected: selectedRow,
    handleClick: handleSelectRow,
    resetSelected,
  } = useSelectRow<string>({
    onDoubleClick(item) {
      void playSong({ uri: item }).catch(() => {
        toast({
          title: "Could not play song!",
          description: "Something went wrong...",
          variant: "destructive",
          duration: 2000,
        });
      });
    },
  });

  const tableRef = useRef<HTMLTableElement>(null);
  useClickOutside(tableRef, resetSelected);

  return (
    <Table id="album-tracks-table" ref={tableRef}>
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
          <AlbumTracksTableRow
            key={`album-tracks-${item.id}`}
            item={item}
            index={index}
            isSelected={selectedRow === item.uri}
            onClick={() => handleSelectRow(item.uri)}
          />
        ))}
      </TableBody>
    </Table>
  );
};

export default AlbumTracksTable;
