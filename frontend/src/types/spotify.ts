/* Object types to cover:
 AudioFeatures, Category, Context,
 CurrentlyPlayingContext, CurrentlyPlaying, CursorObject
 CursorPaging, DeviceObject, Devices, Disallows, Episode
 Error, ExplicitContentSettings, Paging,
 PlayHistory, PlayerError, Playlist, PlaylistTrack, PlaylistTracksRef,
 PrivateUser, PublicUser, RecommendationSeed, Recommendations,
 ResumePoint, SavedAlbum, SavedEpisode, SavedShow, SavedTrack,
 Show, SimplifiedArtist, SimplifiedEpisode,
 SimplifiedPlaylist, SimplifiedShow, SimplifiedTrack, Track,
 TuneableTrack
*/

export type deviceType = 'computer' | 'smartphone' | 'speaker';

export interface SpotifyDeviceObject {
  id: string;
  is_active: boolean;
  is_private_session: boolean;
  is_restricted: boolean;
  name: string;
  type: deviceType;
  volume_percent: number;
}

export interface SpotifyTrackObject extends SpotifySimplifiedTrackObject {
  album: SpotifySimplifiedAlbumObject,
}

export interface SpotifySimplifiedTrackObject {
  artists: SpotifyArtistObject[],
  available_markets: string[],
  disc_number: number,
  duration_ms: number,
  explicit: boolean,
  external_urls: SpotifyExternalUrlObject,
  href: string,
  id: string,
  is_local: boolean,
  is_playable: boolean,
  linked_from: SpotifyLinkedTrackObject,
  name: string,
  preview_url: string,
  restrictions: any,
  track_number: number,
  type: string,
  uri: string
}

export interface SpotifySimplifiedAlbumObject {
  album_group: string,
  album_type: string;
  artists: SpotifyArtistObject[],
  available_markets: string[],
  external_urls: SpotifyExternalUrlObject,
  href: string,
  id: string,
  images: SpotifyImageObject[],
  name: string,
  release_date: string,
  release_date_precision: string,
  total_tracks: number,
  type: string,
  uri: string,
}

export interface SpotifyAlbumObject extends SpotifySimplifiedAlbumObject {
  copyrights: SpotifyCopyrightObject[],
  external_ids: SpotifyExternalIdObject,
  genres: string[],
  label: string,
  popularity: number,
  restrictions: SpotifyRestrictionObject;
  tracks: SpotifySimplifiedTrackObject[],
}

export interface SpotifyCopyrightObject {
  text: string,
  type: string,
}

export interface SpotifyExternalIdObject {
  ean: string,
  isrc: string,
  upc: string,
}

type reasonType = 'market' | 'product' | 'explicit';

export interface SpotifyRestrictionObject {
  reason: reasonType,
}

export interface SpotifyFollowersObject {
  href: string | null,
  total: number,
}

export interface SpotifyExternalUrlObject {
  spotify: string;
}

export interface SpotifyArtistObject {
  external_urls: SpotifyExternalUrlObject;
  followers: SpotifyFollowersObject;
  genres: string[],
  href: string;
  id: string;
  images: SpotifyImageObject[];
  name: string;
  popularity: number;
  type: string;
  uri: string;
}

export interface SpotifySimplifiedPlaylistObject {
  collaborative: boolean,
  description: string,
  external_urls: SpotifyExternalUrlObject,
  href: string,
  id: string,
  images: SpotifyImageObject[],
  name: string,
  owner: SpotifyPublicUserObject;
  public: boolean,
  snapshot_id: string,
  tracks: SpotifyPlaylistTracksRefObject[] | SpotifyPlaylistTrackObject[],
  type: string,
  uri: string,
}

export interface SpotifyPlaylistObject extends SpotifySimplifiedPlaylistObject {
  followers: SpotifyFollowersObject,
  tracks: SpotifyPlaylistTrackObject[],
}

export interface SpotifyPlaylistTrackObject {
  added_at: string,
  added_by: SpotifyPublicUserObject,
  is_local: boolean,
  track: SpotifyTrackObject
}

export interface SpotifyPlaylistTracksRefObject {
  href: string,
  total: number
}

export interface SpotifyPublicUserObject {
  display_name: string;
  external_urls: SpotifyExternalUrlObject;
  followers: SpotifyFollowersObject;
  href: string;
  id: string;
  images: SpotifyImageObject[];
  type: string;
  uri: string;
}

export interface SpotifyImageObject {
  height: number;
  url: string;
  width: number;
}

export interface SpotifyLinkedTrackObject {
  external_urls: SpotifyExternalUrlObject,
  href: string,
  id: string,
  type: string,
  uri: string,
}

///////////////////////////////////////

export interface SpotifyPlayOptions {
  context_uri?: string;
  deviceId: string;
  offset?: number;
  uris?: string[];
}

export interface SpotifyPlayerStatus {
  actions: {
    disallows: {
      resuming: boolean;
      skipping_prev: boolean;
    };
  };
  context: null;
  currently_playing_type: string;
  device: {
    id: string;
    is_active: boolean;
    is_private_session: false;
    is_restricted: false;
    name: string;
    type: string;
    volume_percent: number;
  };
  is_playing: boolean;
  item: {
    album: {
      album_type: string;
      artists: SpotifyArtistObject[];
      available_markets: string[];
      external_urls: {
        spotify: string;
      };
      href: string;
      id: string;
      images: SpotifyImageObject[];
      name: string;
      release_date: string;
      release_date_precision: string;
      total_tracks: number;
      type: string;
      uri: string;
    };
    artists: SpotifyArtistObject[];
    available_markets: string[];
    disc_number: number;
    duration_ms: number;
    explicit: false;
    external_ids: {
      isrc: string;
    };
    external_urls: {
      spotify: string;
    };
    href: string;
    id: string;
    is_local: false;
    name: string;
    popularity: number;
    preview_url: string;
    track_number: number;
    type: string;
    uri: string;
  };
  progress_ms: number;
  repeat_state: string;
  shuffle_state: false;
  timestamp: number;
}

export interface SpotifyPlayerTrack {
  artists: string;
  durationMs: number;
  id: string;
  name: string;
  image: string;
  uri: string;
}

export type SpotifyRepeatType = 'track' | 'context' | 'off';

export type WebPlaybackStatuses = 'ready' | 'not_ready';
export type WebPlaybackStates = 'player_state_changed';
export type WebPlaybackErrors =
  | 'initialization_error'
  | 'authentication_error'
  | 'account_error'
  | 'playback_error';

export interface WebPlaybackError {
  message: WebPlaybackErrors;
}

export interface WebPlaybackReady {
  device_id: string;
}

export interface WebPlaybackState {
  bitrate: number;
  context: {
    metadata: Record<string, unknown>;
    uri: null;
  };
  disallows: {
    resuming: boolean;
    skipping_prev: boolean;
  };
  duration: number;
  paused: boolean;
  position: number;
  repeat_mode: number;
  restrictions: {
    disallow_resuming_reasons: [];
    disallow_skipping_prev_reasons: [];
  };
  shuffle: boolean;
  timestamp: number;
  track_window: {
    current_track: WebPlaybackTrack;
    next_tracks: WebPlaybackTrack[];
    previous_tracks: WebPlaybackTrack[];
  };
}

export interface WebPlaybackAlbum {
  images: WebPlaybackImage[];
  name: string;
  uri: string;
}

export interface WebPlaybackArtist {
  name: string;
  uri: string;
}

export interface WebPlaybackImage {
  height: number;
  url: string;
  width: number;
}

export interface WebPlaybackTrack {
  album: WebPlaybackAlbum;
  artists: WebPlaybackArtist[];
  duration_ms: number;
  id: string;
  is_playable: boolean;
  linked_from: {
    uri: null | string;
    id: null | string;
  };
  linked_from_uri: null | string;
  media_type: string;
  name: string;
  type: string;
  uri: string;
}
