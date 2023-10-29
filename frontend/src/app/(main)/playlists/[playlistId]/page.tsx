import NextImage from "next/image";
import type { PlaylistDetail } from "~/api/types";
import { UserDisplay } from "~/components/other/UserDisplay";
import { env } from "~/env.mjs";
import fetcher from "~/lib/fetcher";
import { getMsToTimeString } from "~/lib/format";
import PlaylistTracks from "./PlaylistTracks";

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

  const playlistLength = data.tracks.items.reduce(
    (acc, curr) => acc + curr.track.duration_ms,
    0,
  );

  return (
    <div>
      <section className="flex flex-row gap-4">
        <NextImage
          width={250}
          height={250}
          alt="Playlist Image"
          src={data.images[0]?.url ?? ""}
          className="h-[250px] w-[250px]"
        />
        <div className="flex flex-col justify-end">
          <h2 className="mb-2 text-sm">
            {data.public ? "Public" : "Private"} playlist
          </h2>
          <h1 className="mb-8 text-7xl font-bold">{data.name}</h1>
          <div className="flex flex-row items-center gap-1 text-sm">
            <UserDisplay user={data.owner} />
            <span className="font-bold">·</span>
            <span>{data.tracks.total} tracks,</span>
            <span>{getMsToTimeString(playlistLength)}</span>
          </div>
        </div>
      </section>
      <PlaylistTracks playlistId={params.playlistId} initialData={data.tracks}/>
    </div>
  );
}
