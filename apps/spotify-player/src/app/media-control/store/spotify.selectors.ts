import {createSelector} from '@ngrx/store';

import {SpotifyState} from './spotify.types';

/**
 * Get the Spotify State.
 *
 * @param state Global State.
 * @param state.spotify Spotify State.
 * @returns Spotify State.
 */
export const selectFeature = (state: {spotify: SpotifyState}): SpotifyState => state.spotify;

export const isPlaying = createSelector(
  selectFeature,
  (state: SpotifyState) => state.playing
);

export const getSongName = createSelector(
  selectFeature,
  (state: SpotifyState) => state.current.name
);

export const getSongProgress = createSelector(
  selectFeature,
  (state: SpotifyState) => state.current.progress
);

export const getSongLength = createSelector(
  selectFeature,
  (state: SpotifyState) => state.current.total
);
