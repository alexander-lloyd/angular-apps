import * as selectors from './spotify.selectors';
import {SpotifyState} from './spotify.types';

describe('Spotify Selectors', () => {
  it('should get is not playing', () => {
    expect.assertions(1);
    const state = {
      playing: false
    };
    expect(selectors.isPlaying.projector(state)).toBe(false);
  });

  it('should get is playing', () => {
    expect.assertions(1);
    const state = {
      playing: true
    };
    expect(selectors.isPlaying.projector(state)).toBe(true);
  });

  it('should get spotify state', () => {
    expect.assertions(1);
    const state = {
      spotify: {
        playing: true
      }
    } as {spotify: SpotifyState};

    expect(selectors.selectFeature(state)).toBe(state.spotify);
  });

  it('should get current progress', () => {
    expect.assertions(1);
    const state = {
      current: {
        progress: 100
      }
    };

    expect(selectors.getSongProgress.projector(state)).toBe(state.current.progress);
  });

  it('should get song length', () => {
    expect.assertions(1);
    const state = {
      current: {
        total: 100
      }
    };

    expect(selectors.getSongLength.projector(state)).toBe(state.current.total);
  });

  it('should get song name', () => {
    expect.assertions(1);
    const state = {
      current: {
        name: 'Song Name'
      }
    };

    expect(selectors.getSongName.projector(state)).toBe(state.current.name);
  });
});
