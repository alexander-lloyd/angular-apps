import {TestBed} from '@angular/core/testing';
import {Action} from '@ngrx/store';
import {provideMockActions} from '@ngrx/effects/testing';
import {of, Observable, throwError} from 'rxjs';

import {SpotifyPlayerAPIService} from '../services/spotify-player-api.service';

import * as actions from './spotify.actions';
import {SpotifyPlayerEffects} from './spotify.effects';


class SpotifyAPIStub {
  public pause$(): void {

  }

  public resume$(): void {

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
});
