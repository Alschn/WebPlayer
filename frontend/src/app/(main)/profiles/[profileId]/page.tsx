interface ProfilesDetailPageProps {
  params: { profileId: string };
}

export default function ProfilesDetailPage({
  params,
}: ProfilesDetailPageProps) {
  return (
    <div>
      <h1>Todo: profile page</h1>
      <h2>Profile {params.profileId}</h2>
    </div>
  );
}
