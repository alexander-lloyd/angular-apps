/* eslint-disable @typescript-eslint/camelcase */
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
  on(currentTrackSuccess, (state: SpotifyState, action: CurrentlyPlayingObject) => {
    const {
      is_playing = false,
      progress_ms = 0,
      item = {
        name: '',
        duration_ms: 0
      }
    } = action;
    return {
      ...state,
      playing: is_playing,
      current: {
        ...state.current,
        name: item.name,
        progress: progress_ms,
        total: item.duration_ms
      }
    };
  })
);

export function spotifyReducer(state: SpotifyState | undefined, action: Action): SpotifyState {
  return _spotifyReducer(state, action);
}
