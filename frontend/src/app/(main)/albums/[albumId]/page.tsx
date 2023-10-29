import type { AlbumDetail } from "~/api/types";
import { env } from "~/env.mjs";
import fetcher from "~/lib/fetcher";
import NextImage from "next/image";
import { UserDisplay } from "~/components/other/UserDisplay";
import { getMsToTimeString } from "~/lib/format";
import AlbumTracks from "./AlbumTracks";

interface AlbumsDetailPageProps {
  params: { albumId: string };
}

function getAlbum(albumId: string) {
  return fetcher(`${env.NEXT_PUBLIC_API_URL}/api/spotify/albums/${albumId}/`);
}

export default async function AlbumsDetailPage({
  params,
}: AlbumsDetailPageProps) {
  const res = await getAlbum(params.albumId);
  const data = (await res.json()) as AlbumDetail;

  const yearReleased = new Date(data.release_date).getFullYear();
  const albumLength = data.tracks.items.reduce(
    (acc, curr) => acc + curr.duration_ms,
    0,
  );
  const author = data.artists[0]!;

  return (
    <div>
      <section className="flex flex-row gap-4">
        <NextImage
          width={250}
          height={250}
          alt="Album Cover"
          src={data.images[0]?.url ?? ""}
        />
        <div className="flex flex-col justify-end">
          <h2 className="mb-2 text-sm">Album</h2>
          <h1 className="mb-8 text-7xl font-bold">{data.name}</h1>
          <div className="flex flex-row items-center gap-1 text-sm">
            {author && <UserDisplay user={author} />}
            <span className="font-bold">·</span>
            <span>{yearReleased}</span>
            <span className="font-bold">·</span>
            <span>{data.total_tracks} tracks,</span>
            <span>{getMsToTimeString(albumLength)}</span>
          </div>
        </div>
      </section>
      <AlbumTracks albumId={params.albumId} initialData={data.tracks} />
    </div>
  );
}
