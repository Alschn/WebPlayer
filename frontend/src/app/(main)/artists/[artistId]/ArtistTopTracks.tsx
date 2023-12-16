import NextImage from "next/image";
import type { ArtistTopTracks } from "~/api/types";
import { Table, TableBody, TableCell, TableRow } from "~/components/ui/table";
import { getMsToTimeString } from "~/lib/format";
import { getArtistTopTracks } from "./actions";
import ExplicitBadge from "~/components/other/ExplicitBadge";

export default async function ArtistTopTracksSection({
  artistId,
}: {
  artistId: string;
}) {
  const res = await getArtistTopTracks(artistId, { limit: 10 });
  const data = (await res.json()) as ArtistTopTracks;

  return (
    <section>
      <h1 className="text-2xl font-bold">Popular</h1>
      <Table>
        <TableBody>
          {data.tracks.map((track, index) => (
            <TableRow
              key={`artist-${artistId}-top-tracks-${track.id}-${index}`}
            >
              <TableCell className="w-[40px]">{index + 1}</TableCell>
              <TableCell>
                <div className="align-center flex flex-row gap-2">
                  <NextImage
                    src={track.album.images?.[0]?.url ?? ""}
                    alt={track.album.name}
                    width={48}
                    height={48}
                    className="h-[48px] w-[48px]"
                  />
                  <div className="flex flex-col justify-center">
                    <span className="line-clamp-1 text-base dark:text-white">
                      {track.name}
                    </span>
                    {track.explicit && (
                      <span>
                        <ExplicitBadge />
                      </span>
                    )}
                  </div>
                </div>
              </TableCell>
              <TableCell></TableCell>
              <TableCell>-</TableCell>
              <TableCell>
                {getMsToTimeString(track.duration_ms, true)}
              </TableCell>
              <TableCell>...</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </section>
  );
}
