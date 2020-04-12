import {createSelector} from '@ngrx/store';

import {SpotifyState} from './spotify.types';

export const selectFeature = (state: {spotify: SpotifyState}): SpotifyState => state.spotify;

export const isPlaying = createSelector(
  selectFeature,
  (state: SpotifyState) => state.playing
);
