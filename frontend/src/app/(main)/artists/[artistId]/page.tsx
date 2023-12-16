import NextImage from "next/image";
import { Suspense } from "react";
import type { ArtistDetail } from "~/api/types";
import { getArtist } from "./actions";
import ArtistTopTracksSection from "./ArtistTopTracks";

interface ArtistsDetailPageProps {
  params: { artistId: string };
}

export default async function ArtistsDetailPage({
  params,
}: ArtistsDetailPageProps) {
  const res = await getArtist(params.artistId);
  const data = (await res.json()) as ArtistDetail;

  return (
    <div>
      <section className="mb-4 flex flex-col gap-4 sm:flex-row">
        <NextImage
          src={data.images[0]?.url ?? ""}
          width={250}
          height={250}
          alt="Artist Image"
          className="h-[250px] w-[250px] rounded-full"
        />
        <div className="flex flex-col justify-end">
          <h1 className="mb-6 text-8xl font-bold">{data.name}</h1>
          <h2 className="font-semibold">
            {data.followers.total.toLocaleString()} followers
          </h2>
        </div>
      </section>

      <div>
        {/* todo: play, follow, more buttons here */}
      </div>

      <Suspense fallback={<h1>Loading artist top tracks...</h1>}>
        <ArtistTopTracksSection artistId={params.artistId} />
      </Suspense>

      {/* todo: albums, appears-on, related artists */}
    </div>
  );
}
