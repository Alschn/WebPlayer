import type { SavedTracksPage } from "~/api/types";
import { env } from "~/env.mjs";
import SavedTracksTable from "~/components/tables/SavedTracksTable";
import fetcher from "~/lib/fetcher";
import { HeartIcon } from "lucide-react";
import { cn } from "~/lib/tailwind";
import { CurrentUserDisplay } from "~/components/other/UserDisplay";

const SavedTracksImage = ({
  className,
  iconClassName,
}: {
  className?: string;
  iconClassName?: string;
}) => {
  return (
    <div
      className={cn(
        "via-opacity-80 relative h-[250px] w-[250px] rounded-sm bg-gradient-to-br from-blue-800 via-purple-500 to-gray-300 shadow-md",
        className,
      )}
    >
      <HeartIcon
        size={100}
        fill="#ffffff"
        stroke="#ffffff"
        className={cn("absolute right-[75px] top-[75px]", iconClassName)}
      />
    </div>
  );
};

function getSavedTracks() {
  return fetcher(`${env.NEXT_PUBLIC_API_URL}/api/spotify/me/tracks/`);
}

export default async function SavedTracksPage() {
  const res = await getSavedTracks();
  const data = (await res.json()) as SavedTracksPage;

  return (
    <div>
      <section className="flex flex-row gap-4">
        <SavedTracksImage />
        <div className="flex flex-col justify-end">
          <h2 className="mb-2 text-sm">Playlist</h2>
          <h1 className="mb-8 text-7xl font-bold">Saved Tracks</h1>
          <div className="flex flex-row items-center gap-1 text-sm">
            <CurrentUserDisplay />
            <span className="font-bold">·</span>
            <span>{data.total} tracks</span>
          </div>
        </div>
      </section>
      <section className="h-full overflow-auto" id="saved-tracks-table-container">
        <SavedTracksTable initialData={data} />
      </section>
    </div>
  );
}
