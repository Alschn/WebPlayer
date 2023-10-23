import NextImage from "next/image";
import type { PlaylistDetail } from "~/api/types";
import { UserDisplay } from "~/components/other/UserDisplay";
import TracksTable from "~/components/tables/SavedTracksTable";
import { env } from "~/env.mjs";
import fetcher from "~/lib/fetcher";

interface ProfilesDetailPageProps {
  params: { playlistId: string };
}

function getPlaylist(playlistId: string) {
  return fetcher(
    `${env.NEXT_PUBLIC_API_URL}/api/spotify/playlists/${playlistId}/`,
  );
}

export default async function PlaylistsDetailPage({
  params,
}: ProfilesDetailPageProps) {
  const res = await getPlaylist(params.playlistId);
  const data = (await res.json()) as PlaylistDetail;

  return (
    <div>
      <section className="flex flex-row gap-4">
        <NextImage
          width={250}
          height={250}
          alt="Playlist Image"
          src={data.images[0]?.url ?? ""}
        />
        <div className="flex flex-col justify-end">
          <h2 className="mb-2 text-sm">
            {data.public ? "Public" : "Private"} playlist
          </h2>
          <h1 className="mb-8 text-7xl font-bold">{data.name}</h1>
          <div className="flex flex-row items-center gap-1 text-sm">
            <UserDisplay user={data.owner} />
            <span className="font-bold">·</span>
            <span>{data.tracks.total} tracks</span>
          </div>
        </div>
      </section>
      <section
        className="h-full overflow-auto"
        id="playlist-tracks-table-container"
      >
        <TracksTable
          // @ts-ignore
          initialData={data.tracks}
        />
      </section>
    </div>
  );
}
