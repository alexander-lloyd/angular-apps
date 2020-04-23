import {Action, createReducer, on} from '@ngrx/store';
import {pause, play, currentTrackSuccess} from './spotify.actions';
import {SpotifyState} from './spotify.types';

export const initialState: SpotifyState = {
  playing: false
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
  on(currentTrackSuccess, (state: SpotifyState, action) => ({
    ...state,
    playing: action.is_playing || false
  }))
);

export function spotifyReducer(state: SpotifyState | undefined, action: Action): SpotifyState {
  return _spotifyReducer(state, action);
}
