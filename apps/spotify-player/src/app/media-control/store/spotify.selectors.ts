import {createSelector, createFeatureSelector, MemoizedSelector} from '@ngrx/store';

import {CurrentTrackState, GlobalState, SpotifyState} from './spotify.types';

const ZERO = 0;
const FEATURE_STATE_SELECTOR = 'spotify';

/**
 * Get the Spotify State.
 *
 * @param state Global State.
 * @param state.spotify Spotify State.
 * @returns Spotify State.
 */
export const getSpotifyFeature = (state: GlobalState): SpotifyState => state.spotify;

/**
 * @member Get the Spotify Feature State.
 */
export const selectSpotifyFeature: MemoizedSelector<GlobalState, SpotifyState> =
  createFeatureSelector<GlobalState, SpotifyState>(FEATURE_STATE_SELECTOR);

/**
 * Are we playing a track.
 *
 * @param state Spotify state.
 * @returns true if we are playing a song.
 */
export const isPlaying = (state: SpotifyState): boolean => state.playing;

/**
 * @member Are we playing a track.
 */
export const selectPlaying = createSelector<GlobalState, SpotifyState, boolean>(
  selectSpotifyFeature,
  isPlaying
);

/**
 * Get the current playing track object.
 *
 * @param currentState Spotify State.
 * @returns Current playing track object.
 */
export const getCurrentSong = (currentState: SpotifyState): CurrentTrackState | null => currentState.current;

/**
 * @member Get the playing song object selector.
 */
export const selectCurrentSong = createSelector<GlobalState, SpotifyState, CurrentTrackState | null>(
  selectSpotifyFeature,
  getCurrentSong
);

/**
 * Get the current playing song name.
 *
 * @param currentSong Current Song object.
 * @returns Current playing track object.
 */
export const getSongName = (currentSong: CurrentTrackState | null): string => currentSong?.name || '';

/**
 * @member Current playing song name selector.
 */
export const selectSongName = createSelector(
  selectCurrentSong,
  getSongName
);

/**
 * Get the current playing song progress.
 *
 * @param currentSong Current Song object.
 * @returns Current song progress.
 */
export const getSongProgress = (currentSong: CurrentTrackState | null): number => currentSong?.progress || ZERO;

/**
 * @member Current playing song progress selector.
 */
export const selectSongProgress = createSelector(
  selectCurrentSong,
  getSongProgress
);

/**
 * Get the current playing song length.
 *
 * @param currentSong Current Song object.
 * @returns Current song length.
 */
export const getSongLength = (currentSong: CurrentTrackState | null): number => currentSong?.total || ZERO;

/**
 * @member Current playing song progress selector.
 */
export const selectSongLength = createSelector(
  selectCurrentSong,
  getSongLength
);
