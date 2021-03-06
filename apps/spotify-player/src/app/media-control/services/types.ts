export type RepeatState =
  | 'track'
  | 'context'
  | 'off';

export type PlayingType =
  | 'track'
  | 'episode'
  | 'ad'
  | 'unknown';

/**
 * ExternalIdObject.
 */
export interface ExternalIdObject {
  ean: string;
  isrc: string;
  upc: string;
}

/**
 * DeviceObject.
 */
export interface DeviceObject {
  id: string;
  is_active: boolean;
  is_restricted: boolean;
  name: string;
  type: string;
  volume_percent: number;
}

/**
 * DevicesObject.
 */
export interface DevicesObject {
  devices: DeviceObject[];
}

/**
 * ImageObject.
 */
export interface ImageObject {
  height: number;
  width: number;
  url: string;
}

/**
 * ExternalUrlObject.
 */
export interface ExternalUrlObject {
  spotify: string;
}

/**
 * ContextObject.
 */
export interface ContextObject {
  external_urls: ExternalUrlObject;
  href: string;
  type: string;
  uri: string;
}

/**
 * PublicUserObject.
 */
export interface PublicUserObject {
  dislay_name: string;
  external_urls: ExternalUrlObject;
  href: string;
  id: string;
  images: ImageObject[];
  type: string;
  uri: string;
}

/**
 * SpotifyEntity.
 */
export interface SpotifyEntity extends ContextObject {
  id: string;
}

/**
 * AlbumObject.
 */
export interface AlbumObject {
  id: string;
  album_type: string;
  images: ImageObject[];
  name: string;
  type: 'album';
  external_urls: ExternalUrlObject;
  href: string;
  uri: string;
}

/**
 * SimplifiedAlbumObject.
 */
export interface SimplifiedAlbumObject {
  album_group: string;
  album_type: string;
  artists: ArtistObject;
  available_marktes: string[];
  external_urls: ExternalUrlObject;
  href: string;
  id: string;
  image: ImageObject[];
  name: string;
  type: 'album';
  uri: string;
}

/**
 * ArtistObject.
 */
export interface ArtistObject {
  external_urls: ExternalUrlObject;
  genres: string[];
  href: string;
  id: string;
  images: ImageObject[];
  name: string;
  popularity: number;
  type: 'artist';
  uri: string;
}

/**
 * PlaylistTrackObject.
 */
export interface PlaylistTrackObject {
  added_at: number | null;
  added_by: PublicUserObject;
  is_local: boolean;
  track: TrackObject;
}

/**
 * SimplifiedTrackObject.
 */
export interface SimplifiedTrackObject {
  artists: ArtistObject[];
  available_markets: string[];
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_urls: ExternalUrlObject;
  href: string;
  id: string;
  is_playable: boolean;
  linked_from: {
    linked_from: TrackObject;
  };
  name: string;
  preview_url: string;
  track_number: number;
  type: 'track';
  uri: string;
}

/**
 * TrackObject.
 */
export interface TrackObject {
  album: SimplifiedAlbumObject;
  artists: ArtistObject[];
  available_markets: string[];
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_ids: ExternalIdObject;
  external_urls: ExternalUrlObject;
  href: string;
  id: string;
  is_playable: boolean;
  linked_from: TrackObject;
  name: string;
  popularity: number;
  preview_url: string;
  restriction: TrackRestrictionObject[];
  track_number: number;
  type: 'track';
  uri: string;
}

/**
 * TrackRestrictionObject.
 */
export interface TrackRestrictionObject extends TrackObject {
  restrictions: {
    resaon: string;
  };
}

/**
 * PlaylistObject.
 */
export interface PlaylistObject {
  collaborative: boolean;
  external_urls: ExternalIdObject;
  href: string;
  id: string;
  images: ImageObject[];
  name: string;
  owner: PublicUserObject;
  public: boolean | null;
  snapshot_id: string;
  tracks: PlaylistTrackObject[];
  type: string;
  uri: string;
}

/**
 * CurrentlyPlayingObject.
 */
export interface CurrentlyPlayingObject {
  context: ContextObject;
  currently_playing_type: PlayingType;
  is_playing: boolean;
  item: TrackObject;
  progress_ms: number;
  timestamp: number;
}

export type PlayerErrorReason =
  | 'NO_PREV_TRACK'
  | 'NO_NEXT_TRACK'
  | 'NO_SPECIFIC_TRACK'
  | 'ALREADY_PAUSED'
  | 'NOT_PAUSED'
  | 'NOT_PLAYING_LOCALLY'
  | 'NOT_PLAYING_TRACK'
  | 'NOT_PLAYING_CONTENT'
  | 'ENDLESS_CONTEXT'
  | 'CONTEXT_DISALLOW'
  | 'ALREADY_PLAYING'
  | 'RATE_LIMITED'
  | 'REMOTE_CONTROL_DISALLOW'
  | 'DEVICE_NOT_CONTROLLABLE'
  | 'VOLUME_CONTROL_DISALLOW'
  | 'NO_ACTIVE_DEVICE'
  | 'PREMIUM_REQUIRED'
  | 'UNKNOWN';

/**
 * PlayerErrorObject.
 */
export interface PlayerErrorObject {
  status: number;
  message: PlayerErrorReason;
  reason: string;
}

/**
 * PlayerErrorResponse.
 */
export interface PlayerErrorResponse {
  error: PlayerErrorObject;
}
