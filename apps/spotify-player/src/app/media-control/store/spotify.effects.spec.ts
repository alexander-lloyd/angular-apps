import {TestBed} from '@angular/core/testing';
import {Action} from '@ngrx/store';
import {provideMockActions} from '@ngrx/effects/testing';
import {of, Observable, throwError} from 'rxjs';

import {SpotifyPlayerAPIService} from '../services/spotify-player-api.service';

import * as actions from './spotify.actions';
import {SpotifyPlayerEffects} from './spotify.effects';
import * as currentlyPlayingObject from '../services/currently-playing-object.response.json';
import {CurrentlyPlayingObject} from '../services/types';


class SpotifyAPIStub {
  public pause$(): void {
  }

  public resume$(): void {
  }

  public getCurrentPlayback$(): void {
  }

  public previousTrack$(): void {
  }

  public skipTrack$(): void {
  }
}

describe('Spotify Effects', () => {
  let actions$: Observable<Action>;
  let effects: SpotifyPlayerEffects;
  let mockAPIService: SpotifyPlayerAPIService;


  beforeEach(() => {
    jest.resetAllMocks();
    TestBed.configureTestingModule({
      providers: [
        provideMockActions(() => actions$),
        SpotifyPlayerEffects,
        {
          provide: SpotifyPlayerAPIService,
          useClass: SpotifyAPIStub
        }
      ]
    });

    effects = TestBed.inject(SpotifyPlayerEffects);
    mockAPIService = TestBed.inject(SpotifyPlayerAPIService);
  });

  it('should emit a pause effect when pause actions is emitted', async () => {
    expect.assertions(1);
    actions$ = of(actions.pause());
    const mockPauseAPI = jest.spyOn(mockAPIService, 'pause$').mockImplementation(() => of(null));

    await new Promise((resolve) => {
      effects.pause$.subscribe(() => {
        expect(mockPauseAPI).toHaveBeenCalledTimes(1);
        resolve();
      });
    });
  });

  it('should emit a pause error action when pause http request fails', async () => {
    expect.assertions(2);
    actions$ = of(actions.pause());
    const mockPauseAPI = jest.spyOn(mockAPIService, 'pause$').mockImplementation(() => throwError('Error'));

    await new Promise((resolve) => {
      effects.pause$.subscribe((action: Action) => {
        expect(action.type).toBe(actions.PAUSE_ERROR);
        expect(mockPauseAPI).toHaveBeenCalledTimes(1);
        resolve();
      });
    });
  });

  it('should emit a play effect when play actions is emitted', async () => {
    expect.assertions(1);
    actions$ = of(actions.play());
    const mockResumeAPI = jest.spyOn(mockAPIService, 'resume$').mockImplementation(() => of(null));

    await new Promise((resolve) => {
      effects.play$.subscribe(() => {
        expect(mockResumeAPI).toHaveBeenCalledTimes(1);
        resolve();
      });
    });
  });

  it('should emit a play error action when play http request fails', async () => {
    expect.assertions(2);
    actions$ = of(actions.play());
    const mockPauseAPI = jest.spyOn(mockAPIService, 'resume$').mockImplementation(() => throwError('Error'));

    await new Promise((resolve) => {
      effects.play$.subscribe((action: Action) => {
        expect(action.type).toBe(actions.PLAY_ERROR);
        expect(mockPauseAPI).toHaveBeenCalledTimes(1);
        resolve();
      });
    });
  });

  it('should emit a current track success when current track requested', async () => {
    expect.assertions(2);
    actions$ = of(actions.currentTrackRequest());
    const mockCurrentPlaybackAPI = jest.spyOn(mockAPIService, 'getCurrentPlayback$')
      .mockImplementation(() => of(currentlyPlayingObject as CurrentlyPlayingObject));

    await new Promise((resolve) => {
      effects.currentTrack$.subscribe((action: Action) => {
        expect(action.type).toBe(actions.CURRENT_TRACK_SUCCESS);
        expect(mockCurrentPlaybackAPI).toHaveBeenCalledTimes(1);
        resolve();
      });
    });
  });

  it('should emit a current track failure when current track request failed', async () => {
    expect.assertions(2);
    actions$ = of(actions.currentTrackRequest());
    const mockCurrentPlaybackAPI = jest.spyOn(mockAPIService, 'getCurrentPlayback$')
      .mockImplementation(() => throwError('Error'));

    await new Promise((resolve) => {
      effects.currentTrack$.subscribe((action: Action) => {
        expect(action.type).toBe(actions.CURRENT_TRACK_FAILURE);
        expect(mockCurrentPlaybackAPI).toHaveBeenCalledTimes(1);
        resolve();
      });
    });
  });

  it('should call previous track api endpoint when previous action emitted', async () => {
    expect.assertions(2);
    actions$ = of(actions.previousAction());
    const mockPreviousAPI = jest.spyOn(mockAPIService, 'previousTrack$')
      .mockImplementation(() => of(null));

    await new Promise((resolve) => {
      effects.previous$.subscribe((action: Action) => {
        expect(action.type).toBe(actions.NOOP);
        expect(mockPreviousAPI).toHaveBeenCalledTimes(1);
        resolve();
      });
    });
  });

  it('should emit previous error action when error occurs', async () => {
    expect.assertions(2);
    actions$ = of(actions.previousAction());
    const mockPreviousAPI = jest.spyOn(mockAPIService, 'previousTrack$')
      .mockImplementation(() => throwError('Error'));

    await new Promise((resolve) => {
      effects.previous$.subscribe((action: Action) => {
        expect(action.type).toBe(actions.PREVIOUS_ERROR);
        expect(mockPreviousAPI).toHaveBeenCalledTimes(1);
        resolve();
      });
    });
  });

  it('should call skip track api endpoint when skip action emitted', async () => {
    expect.assertions(2);
    actions$ = of(actions.skipAction());
    const mockSkipAPI = jest.spyOn(mockAPIService, 'skipTrack$')
      .mockImplementation(() => of(null));

    await new Promise((resolve) => {
      effects.skip$.subscribe((action: Action) => {
        expect(action.type).toBe(actions.NOOP);
        expect(mockSkipAPI).toHaveBeenCalledTimes(1);
        resolve();
      });
    });
  });

  it('should emit skip error action when error occurs', async () => {
    expect.assertions(2);
    actions$ = of(actions.skipAction());
    const mockSkipAPI = jest.spyOn(mockAPIService, 'skipTrack$')
      .mockImplementation(() => throwError('Error'));

    await new Promise((resolve) => {
      effects.skip$.subscribe((action: Action) => {
        expect(action.type).toBe(actions.SKIP_ERROR);
        expect(mockSkipAPI).toHaveBeenCalledTimes(1);
        resolve();
      });
    });
  });
});
