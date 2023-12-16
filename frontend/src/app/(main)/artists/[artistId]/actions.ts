"use server";

import { env } from "~/env.mjs";
import fetcher from "~/lib/fetcher";

export async function getArtist(artistId: string) {
  return fetcher(`${env.NEXT_PUBLIC_API_URL}/api/spotify/artists/${artistId}/`);
}

export async function getArtistAlbums(artistId: string) {
  return fetcher(
    `${env.NEXT_PUBLIC_API_URL}/api/spotify/artists/${artistId}/albums/`,
  );
}

export interface ArtistTopTracksParams {
  limit?: number;
  offset?: number;
}

export async function getArtistTopTracks(
  artistId: string,
  params?: ArtistTopTracksParams,
) {
  const queryParams = new URLSearchParams(params as Record<string, string>);

  return fetcher(
    `${env.NEXT_PUBLIC_API_URL}/api/spotify/artists/${artistId}/top-tracks/?` +
      queryParams.toString(),
  );
}

export async function getArtistRelatedArtists(artistId: string) {
  return fetcher(
    `${env.NEXT_PUBLIC_API_URL}/api/spotify/artists/${artistId}/related-artists/`,
  );
}
