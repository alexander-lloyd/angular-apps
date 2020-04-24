import {Action, createReducer, on} from '@ngrx/store';
import {pause, play, currentTrackSuccess} from './spotify.actions';
import {SpotifyState} from './spotify.types';
import {TrackObject} from '../services/types';

export const initialState: SpotifyState = {
  playing: false,
  current: null
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
  on(currentTrackSuccess, (state: SpotifyState, action) => {
    const currentSong = action.item;
    let current = null;
    // Is it an empty object?
    if (Object.keys(currentSong || {}).length) {
      current = {
        ...state.current,
        name: (currentSong as TrackObject).name
      };
    }

    return {
      ...state,
      playing: action.is_playing || false,
      current
    };
  })
);

export function spotifyReducer(state: SpotifyState | undefined, action: Action): SpotifyState {
  return _spotifyReducer(state, action);
}
