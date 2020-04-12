import {Action, createReducer, on, ActionReducer} from '@ngrx/store';
import {pause, play} from './spotify.actions';
import {SpotifyState} from './spotify.types';

export const initialState: SpotifyState = {
  playing: false
};

export const _spotifyReducer = createReducer(initialState,
  on(pause, (state) => ({
    ...state,
    playing: false
  })),
  on(play, (state) => ({
    ...state,
    playing: true
  })));

export function spotifyReducer(state: SpotifyState | undefined, action: Action): SpotifyState {
  return _spotifyReducer(state, action);
}
