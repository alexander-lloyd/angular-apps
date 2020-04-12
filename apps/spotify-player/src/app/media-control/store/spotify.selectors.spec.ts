import {selectFeature, isPlaying} from './spotify.selectors';
import {SpotifyState} from './spotify.types';

describe('Spotify Selectors', () => {
  it('should get is not playing', () => {
    expect.assertions(1);
    const state: SpotifyState = {
      playing: false
    };
    expect(isPlaying.projector(state)).toBe(false);
  });

  it('should get is playing', () => {
    expect.assertions(1);
    const state: SpotifyState = {
      playing: true
    };
    expect(isPlaying.projector(state)).toBe(true);
  });

  it('should get spotify state', () => {
    expect.assertions(1);
    const state = {
      spotify: {
        playing: true
      }
    };

    expect(selectFeature(state)).toBe(state.spotify);
  });
});
