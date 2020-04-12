import * as actions from './spotify.actions';
import {spotifyReducer, initialState} from './spotify.reducer';
import {SpotifyState} from './spotify.types';

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
});
