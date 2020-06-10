import * as actions from './spotify.actions';
import {spotifyReducer, initialState} from './spotify.reducer';
import {SpotifyState} from './spotify.types';
import {CurrentlyPlayingObject} from '../services/types';

describe('Spotify Reducer', () => {
  it('should return the initial state', () => {
    expect.assertions(1);
    const state = spotifyReducer(initialState, {type: 'Noop Action'});
    expect(state).toBe(initialState);
  });

  it('should pause', () => {
    expect.assertions(1);
    const state: SpotifyState = {
      playing: true,
      current: {
        name: 'Song Name',
        progress: 0,
        total: 0
      }
    };
    const action = actions.pause();

    expect(spotifyReducer(state, action)).toStrictEqual({
      playing: false,
      current: {
        name: 'Song Name',
        progress: 0,
        total: 0
      }
    });
  });

  it('should play', () => {
    expect.assertions(1);
    const state: SpotifyState = {
      playing: false,
      current: {
        name: 'Song Name',
        progress: 0,
        total: 0
      }
    };
    const action = actions.play();

    expect(spotifyReducer(state, action)).toStrictEqual({
      playing: true,
      current: {
        name: 'Song Name',
        progress: 0,
        total: 0
      }
    });
  });

  it('should get playing state from current track success', () => {
    expect.assertions(1);
    const state: SpotifyState = {
      playing: false,
      current: {
        name: 'Song Name',
        progress: 0,
        total: 0
      }
    };

    const props = {
      is_playing: true,
      progress_ms: 100,
      item: {
        name: 'Song Name',
        duration_ms: 200
      }
    } as CurrentlyPlayingObject;
    const action = actions.currentTrackSuccess(props);

    expect(spotifyReducer(state, action)).toStrictEqual({
      playing: true,
      current: {
        name: 'Song Name',
        progress: 100,
        total: 200
      }
    });
  });

  it('should get playing state from current track success 2', () => {
    expect.assertions(1);
    const state: SpotifyState = {
      playing: true,
      current: {
        name: 'Song Name',
        progress: 0,
        total: 0
      }
    };

    const props = {
      is_playing: false,
      progress_ms: 200,
      item: {
        name: 'Song Name',
        duration_ms: 400
      }
    } as CurrentlyPlayingObject;
    const action = actions.currentTrackSuccess(props);

    expect(spotifyReducer(state, action)).toStrictEqual({
      playing: false,
      current: {
        name: 'Song Name',
        progress: 200,
        total: 400
      }
    });
  });

  it('should set not playing if we don\'t get any response', () => {
    expect.assertions(1);
    const state: SpotifyState = {
      playing: true,
      current: {
        name: 'Song Name',
        progress: 0,
        total: 0
      }
    };

    const action = actions.currentTrackSuccess(null);

    expect(spotifyReducer(state, action)).toStrictEqual({
      playing: false,
      current: {
        name: '',
        progress: 0,
        total: 0
      }
    });
  });
});
