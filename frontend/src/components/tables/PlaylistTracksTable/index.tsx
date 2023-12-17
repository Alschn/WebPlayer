"use client";

import { useRef } from "react";
import { playSong } from "~/api/player";
import type { PlaylistTrack } from "~/api/types";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { useToast } from "~/components/ui/use-toast";
import { useClickOutside } from "~/hooks/useClickOutside";
import { useSelectRow } from "~/hooks/useSelectedRow";
import PlaylistTracksTableRow from "./PlaylistTracksTableRow";

interface PlaylistTracksTableProps {
  data: PlaylistTrack[];
}

const PlaylistTracksTable = ({ data }: PlaylistTracksTableProps) => {
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
    <Table id="playlist-tracks-table" ref={tableRef}>
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
            isSelected={selectedRow === item.track.uri}
            onClick={() => handleSelectRow(item.track.uri)}
          />
        ))}
      </TableBody>
    </Table>
  );
};

export default PlaylistTracksTable;
