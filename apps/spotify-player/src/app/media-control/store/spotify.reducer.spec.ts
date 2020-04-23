/* eslint-disable @typescript-eslint/camelcase */
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
      playing: true
    };
    const action = actions.pause();

    expect(spotifyReducer(state, action)).toStrictEqual({
      playing: false
    });
  });

  it('should play', () => {
    expect.assertions(1);
    const state: SpotifyState = {
      playing: false
    };
    const action = actions.play();

    expect(spotifyReducer(state, action)).toStrictEqual({
      playing: true
    });
  });

  it('should get playing state from current track success', () => {
    expect.assertions(1);
    const state: SpotifyState = {
      playing: false
    };

    const props = {
      is_playing: true
    };
    const action = actions.currentTrackSuccess(props as CurrentlyPlayingObject);

    expect(spotifyReducer(state, action)).toStrictEqual({
      playing: true
    });
  });

  it('should get playing state from current track success 2', () => {
    expect.assertions(1);
    const state: SpotifyState = {
      playing: true
    };

    const props = {
      is_playing: false
    };
    const action = actions.currentTrackSuccess(props as CurrentlyPlayingObject);

    expect(spotifyReducer(state, action)).toStrictEqual({
      playing: false
    });
  });

  it('should set not playing if we don\'t get any response', () => {
    expect.assertions(1);
    const state: SpotifyState = {
      playing: true
    };

    const action = actions.currentTrackSuccess(null);

    expect(spotifyReducer(state, action)).toStrictEqual({
      playing: false
    });
  });
});
