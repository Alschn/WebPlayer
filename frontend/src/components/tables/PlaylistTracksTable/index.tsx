import type { ColumnDef, Row } from "@tanstack/react-table";
import NextImage from "next/image";
import NextLink from "next/link";
import { useCallback } from "react";
import { playSong } from "~/api/player";
import type { PlaylistTrack } from "~/api/types";
import DataTable from "~/components/tables/DataTable";
import { useToast } from "~/components/ui/use-toast";
import { getMsToTimeString, relativeTimeFromDates } from "~/lib/format";
import DropdownMoreHorizMenu from "../SavedTracksTable/DropdownMoreHorizMenu";

interface PlaylistTracksTableProps {
  data: PlaylistTrack[];
}

const columns: ColumnDef<PlaylistTrack>[] = [
  {
    header: "#",
    cell: ({ row }) => <span>{row.index + 1}</span>,
  },
  {
    header: "Title",
    cell: ({ row }) => (
      <div className="align-center flex flex-row gap-2">
        <NextImage
          src={row.original.track.album.images?.[0]?.url ?? ""}
          alt={row.original.track.album.name}
          width={48}
          height={48}
        />
        <div className="flex flex-col justify-center">
          <span className="line-clamp-1 text-base dark:text-white">
            {row.original.track.name}
          </span>
          <div>
            {row.original.track.artists.map((artist, index, array) => (
              <div
                key={`track-${row.original.track.id}-artist-${artist.id}`}
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
    header: "Time",
    accessorKey: "track.duration_ms",
    cell: (props) => (
      <span className="dark:text-stone-400">
        {getMsToTimeString(props.getValue<number>(), true)}
      </span>
    ),
  },
  {
    id: "actions",
    header: "",
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
