import type { PlaylistsPage } from "~/api/types";
import SidebarPlaylists from "~/components/layout/Sidebar/SidebarPlaylists";
import { env } from "~/env.mjs";
import fetcher from "~/lib/fetcher";

function getMePlaylists() {
  return fetcher(
    `${env.NEXT_PUBLIC_API_URL}/api/spotify/me/playlists/?limit=20&offset=0`,
  );
}

export default async function SidebarParellelPage() {
  const res = await getMePlaylists();
  const data = (await res.json()) as PlaylistsPage;
  return <SidebarPlaylists initialData={data} />;
}
