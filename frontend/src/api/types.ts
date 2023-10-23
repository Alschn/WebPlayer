type Page<T extends Record<string, unknown>> = {
  items: T[];
  href: string;
  limit: number;
  next: string;
  offset: number;
  previous: string;
  total: number;
};

export type Image = { url: string; height: number; width: number };

export type Playlist = {
  id: string;
  name: string;
  images: { url: string }[];
  owner: { display_name: string };
  // todo: add more fields
};

export type PlaylistsPage = Page<Playlist>;

export type SavedTrackItem = { added_at: string; track: Track };

export type SavedTracksPage = Page<SavedTrackItem>;

export type Track = {
  album: { name: string; images: Image[]; id: string };
  artists: { name: string; id: string }[];
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

export type TracksPage = Page<Track>;

export type PlaylistDetail = {
  collaborative: boolean;
  description: string;
  externals_urls: {
    spotify: string;
  };
  followers: {
    href: string | null;
    total: number;
  };
  href: string;
  id: string;
  images: Image[];
  name: string;
  owner: {
    display_name: string;
    external_urls: {
      spotify: string;
    };
    href: string;
    id: string;
    type: string;
    uri: string;
  };
  primary_color: string | null;
  public: boolean;
  snapshot_id: string;
  tracks: TracksPage;
  type: "playlist";
  uri: string;
};