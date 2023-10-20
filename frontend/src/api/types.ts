export type Playlist = {
  id: string;
  name: string;
  images: { url: string }[];
  owner: { display_name: string };
};

export type PlaylistsPage = {
  items: Playlist[];
  href: string;
  limit: number;
  offset: number;
  next: string;
  previous: string;
  total: number;
};

export type Image = { url: string; height: number; width: number };

export type Track = {
  album: { name: string; images: Image[] };
  artists: { name: string }[];
  available_markets: string[];
  external_urls: { spotify: string };
  href: string;
  id: string;
  images: Image[];
  name: string;
  release_date: string;
  release_date_precision: string;
  total_tracks: number;
  type: string;
  uri: string;
  disc_number: number;
  duration_ms: number;
};

export type SavedTrackItem = { added_at: string; track: Track };

export type SavedTracksPage = {
  items: SavedTrackItem[];
  total: number;
  limit: number;
  offset: number;
  next: string | null;
  previous: string | null;
};
