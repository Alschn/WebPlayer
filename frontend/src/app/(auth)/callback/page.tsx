import { redirect } from "next/navigation";

interface SpotifyCallbackPageProps {
  searchParams?: Record<string, string | string[] | undefined>;
}

export default async function SpotifyCallbackPage({
  searchParams,
}: SpotifyCallbackPageProps) {
  const error = searchParams?.error;

  if (error) return <pre>{JSON.stringify({ error }, null, 2)}</pre>;

  const code = searchParams?.code;

  if (!code) return <p>Missing code</p>;

  let data;

  try {
    const r = await fetch("http://localhost:3000/api/auth/spotify/login/", {
      method: "POST",
      body: JSON.stringify({ code }),
      cache: "no-store",
    });
    data = (await r.json()) as unknown;
    if (!r.ok) throw new Error(JSON.stringify(data));
  } catch (err) {
    console.error("err:", err);
    return <p>Something went wrong</p>;
  }

  const key = (data as { key: string }).key;
  redirect(`/?token=${key}`);
}
