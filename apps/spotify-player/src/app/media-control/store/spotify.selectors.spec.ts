import * as selectors from './spotify.selectors';
import {GlobalState, SpotifyState} from './spotify.types';

describe('Spotify Selectors', () => {
  it('should get spotify feature state', () => {
    expect.assertions(1);
    const state: GlobalState = {
      spotify: {
        current: null,
        playing: false
      }
    };

    expect(selectors.getSpotifyFeature(state)).toBe(state.spotify);
  });

  it('should get is not playing', () => {
    expect.assertions(1);
    const state = {
      playing: false
    };
    expect(selectors.selectPlaying.projector(state)).toBe(false);
  });

  it('should get is playing', () => {
    expect.assertions(1);
    const state = {
      playing: true
    };
    expect(selectors.selectPlaying.projector(state)).toBe(true);
  });

  it('should get current song', () => {
    expect.assertions(1);
    const state: SpotifyState = {
      playing: true,
      current: {
        name: 'Song',
        progress: 1,
        total: 2
      }
    };
    expect(selectors.selectCurrentSong.projector(state)).toBe(state.current);
  });

  it('should get song name', () => {
    expect.assertions(1);
    const state = {
      name: 'Song Name'
    };

    expect(selectors.selectSongName.projector(state)).toBe(state.name);
  });

  it('should return null when no song is playing', () => {
    expect.assertions(1);
    const state = null;

    expect(selectors.selectSongName.projector(state)).toBe('');
  });

  it('should get current progress', () => {
    expect.assertions(1);
    const state = {
      progress: 100
    };

    expect(selectors.selectSongProgress.projector(state)).toBe(state.progress);
  });

  it('should return null if no song is playing', () => {
    expect.assertions(1);
    const state = null;

    expect(selectors.selectSongProgress.projector(state)).toBe(0);
  });

  it('should get song length', () => {
    expect.assertions(1);
    const state = {
      total: 100
    };

    expect(selectors.selectSongLength.projector(state)).toBe(state.total);
  });

  it('should return null if no current song', () => {
    expect.assertions(1);
    const state = null;

    expect(selectors.selectSongLength.projector(state)).toBe(0);
  });
});
