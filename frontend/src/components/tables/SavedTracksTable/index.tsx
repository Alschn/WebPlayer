"use client";

import type { SavedTrackItem } from "~/api/types";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import SavedTrackTableRow from "./SavedTrackTableRow";
import { useSelectRow } from "~/hooks/useSelectedRow";
import { playSong } from "~/api/player";
import { useRef } from "react";
import { useClickOutside } from "~/hooks/useClickOutside";
import { useToast } from "~/components/ui/use-toast";
// import { usePlaybackState } from "react-spotify-web-playback-sdk";

interface SavedTracksTableProps {
  data: SavedTrackItem[];
}

export default function SavedTracksTable({ data }: SavedTracksTableProps) {
  // const playbackState = usePlaybackState();

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
    <Table id="saved-tracks-table" ref={tableRef}>
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
            isSelected={selectedRow === item.track.uri}
            // isPlaying={playbackState?.track_window.current_track.uri === item.track.uri}
            onClick={() => handleSelectRow(item.track.uri)}
          />
        ))}
      </TableBody>
    </Table>
  );
}
