import { CurrentUserDisplay } from "~/components/other/UserDisplay";
import SavedTracksImage from "./SavedTracksImage";

interface SavedTracksInfoProps {
  tracksCount: number;
}

const SavedTracksInfo = ({ tracksCount }: SavedTracksInfoProps) => {
  return (
    <section className="flex flex-row gap-4" id="saved-tracks-info">
      <SavedTracksImage />
      <div className="flex flex-col justify-end">
        <h2 className="mb-2 text-sm">Playlist</h2>
        <h1 className="mb-8 text-7xl font-bold">Saved Tracks</h1>
        <div className="flex flex-row items-center gap-1 text-sm">
          <CurrentUserDisplay />
          <span className="font-bold">·</span>
          <span>{tracksCount} tracks</span>
        </div>
      </div>
    </section>
  );
};

export default SavedTracksInfo;
