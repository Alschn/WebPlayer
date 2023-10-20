interface AlbumsDetailPageProps {
  params: { albumId: string };
}

export default function AlbumsDetailPage({
  params,
}: AlbumsDetailPageProps) {
  return (
    <div>
      <h1>Todo: album page</h1>
      <h2>Album {params.albumId}</h2>
    </div>
  );
}
