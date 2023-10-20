interface ProfilesDetailPageProps {
  params: { playlistId: string };
}

export default function PlaylistsDetailPage({
  params,
}: ProfilesDetailPageProps) {
  return (
    <div>
      <h1>Todo: playlist page</h1>
      <h2>Playlist {params.playlistId}</h2>
    </div>
  );
}
