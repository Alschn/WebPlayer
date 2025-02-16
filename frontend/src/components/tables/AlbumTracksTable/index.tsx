"use client";

import type { Row, ColumnDef } from "@tanstack/react-table";
import NextLink from "next/link";
import { useCallback } from "react";
import { playSong } from "~/api/player";
import type { Track } from "~/api/types";
import { useToast } from "~/components/ui/use-toast";
import DataTable from "../DataTable";
import { Clock3Icon } from "lucide-react";
import { getMsToTimeString } from "~/lib/format";
import DropdownMoreHorizMenu from "../SavedTracksTable/DropdownMoreHorizMenu";

interface AlbumTracksTableProps {
  data: Track[];
}

const columns: ColumnDef<Track>[] = [
  {
    header: "#",
    cell: ({ row }) => <span>{row.index + 1}</span>,
    // later: show playing state normally and on hover
  },
  {
    header: "Title",
    accessorKey: "name",
    cell: ({ row }) => (
      <div className="align-center flex flex-row gap-2">
        <div className="flex flex-col justify-center">
          <span className="text-base dark:text-white">{row.original.name}</span>
          <div>
            {row.original.artists.map((artist, index, array) => (
              <div
                key={`track-${row.original.id}-artist-${artist.id}`}
                className="inline-block"
              >
                <NextLink
                  href={`/artists/${artist.id}/`}
                  className="hover:underline dark:text-stone-400 dark:hover:text-white"
                >
                  {artist.name}
                </NextLink>
                {index !== array.length - 1 && (
                  <span className="mr-1 dark:text-stone-400">{", "}</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "add_to_favourites",
    header: () => <></>,
    // later: when row is hovered, show icon buttons
  },
  {
    accessorKey: "duration_ms",
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

const AlbumTracksTable = ({ data }: AlbumTracksTableProps) => {
  const { toast } = useToast();

  const handleRowDoubleClick = useCallback(
    async (row: Row<Track>) => {
      await playSong({ uri: row.original.uri }).catch(() => {
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

export default AlbumTracksTable;
