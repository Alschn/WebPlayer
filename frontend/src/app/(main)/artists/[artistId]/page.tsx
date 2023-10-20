interface ArtistsDetailPageProps {
  params: { artistId: string };
}

export default function ArtistsDetailPage({
  params,
}: ArtistsDetailPageProps) {
  return (
    <div>
      <h1>Todo: playlist page</h1>
      <h2>Playlist {params.artistId}</h2>
    </div>
  );
}
