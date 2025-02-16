import type { ColumnDef, Row } from "@tanstack/react-table";
import NextLink from "next/link";
import { useCallback } from "react";
import { playSong } from "~/api/player";
import type { PlaylistTrack } from "~/api/types";
import DataTable from "~/components/tables/DataTable";
import { useToast } from "~/components/ui/use-toast";
import { getMsToTimeString, relativeTimeFromDates } from "~/lib/format";
import DropdownMoreHorizMenu from "../SavedTracksTable/DropdownMoreHorizMenu";
import PlaylistTrackTitleColumn from "./PlaylistTrackTitleColumn";
import { Clock3Icon } from "lucide-react";

interface PlaylistTracksTableProps {
  data: PlaylistTrack[];
}

const columns: ColumnDef<PlaylistTrack>[] = [
  {
    header: "#",
    cell: ({ row }) => <span>{row.index + 1}</span>,
    // later: show playing state normally and on hover
  },
  {
    header: "Title",
    cell: ({ row }) => <PlaylistTrackTitleColumn track={row.original.track} />,
  },
  {
    header: "Album",
    cell: ({ row }) => (
      <NextLink
        href={`/albums/${row.original.track.album.id}/`}
        className="line-clamp-1 hover:underline dark:text-stone-400 dark:hover:text-white"
      >
        {row.original.track.album.name}
      </NextLink>
    ),
  },
  {
    header: "Date Added",
    accessorKey: "added_at",
    cell: (props) => (
      <span className="dark:text-stone-400">
        {relativeTimeFromDates(new Date(props.getValue<string>()))}
      </span>
    ),
  },
  {
    id: "add_to_favourites",
    header: () => <></>,
    // later: when row is hovered, show icon buttons
  },
  {
    accessorKey: "track.duration_ms",
    header: () => <Clock3Icon />,
    cell: (props) => (
      <span className="dark:text-stone-400">
        {getMsToTimeString(props.getValue<number>(), true)}
      </span>
    ),
  },
  {
    id: "actions",
    // later: when column is hovered, show shevron down with columns selection
    header: () => <></>,
    cell: () => <DropdownMoreHorizMenu />,
  },
];

const PlaylistTracksTable = ({ data }: PlaylistTracksTableProps) => {
  const { toast } = useToast();

  const handleRowDoubleClick = useCallback(
    async (row: Row<PlaylistTrack>) => {
      await playSong({ uri: row.original.track.uri }).catch(() => {
        toast({
          title: "Could not play song!",
          description: "Something went wrong...",
          variant: "destructive",
          duration: 2000,
        });
      });
    },
    [toast],
  );

  return (
    <DataTable
      data={data}
      columns={columns}
      resetRowSelectionOnClickOutside
      selectRowOnClick
      onRowDoubleClick={handleRowDoubleClick}
    />
  );
};

export default PlaylistTracksTable;
