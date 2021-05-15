import {Action, createReducer, on} from '@ngrx/store';
import {pause, play, currentTrackSuccess} from './spotify.actions';
import {SpotifyState} from './spotify.types';
import {CurrentlyPlayingObject} from '../services/types';

export const initialState: SpotifyState = {
  playing: false,
  current: {
    name: '',
    progress: 0,
    total: 0
  }
};

const DEFAULT_START_TIME = 0;

export const _spotifyReducer = createReducer(
  initialState,
  on(pause, (state: SpotifyState) => ({
    ...state,
    playing: false
  })),
  on(play, (state: SpotifyState) => ({
    ...state,
    playing: true
  })),
  on(currentTrackSuccess, (state: SpotifyState, action: CurrentlyPlayingObject | null) => ({
    ...state,
    playing: action?.is_playing || false,
    current: {
      ...state.current,
      name: action?.item?.name || '',
      progress: action?.progress_ms || DEFAULT_START_TIME,
      total: action?.item?.duration_ms || 0
    }
  } as SpotifyState))
);

/**
 * Spotify reducer.
 *
 * @param state Spotify State.
 * @param action Action.
 * @returns The new Spotify Player State.
 */
export function spotifyReducer(state: SpotifyState | undefined, action: Action): SpotifyState {
  return _spotifyReducer(state, action);
}
