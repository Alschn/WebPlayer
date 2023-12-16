import type { SavedTracksPage } from "~/api/types";
import { env } from "~/env.mjs";
import fetcher from "~/lib/fetcher";
import SavedTracks from "./SavedTracks";
import SavedTracksInfo from "./SavedTracksInfo";

function getSavedTracks() {
  return fetcher(`${env.NEXT_PUBLIC_API_URL}/api/spotify/me/tracks/`);
}

export default async function SavedTracksPage() {
  const res = await getSavedTracks();
  const data = (await res.json()) as SavedTracksPage;

  return (
    <>
      <SavedTracksInfo tracksCount={data.total} />
      <SavedTracks initialData={data} />
    </>
  );
}
