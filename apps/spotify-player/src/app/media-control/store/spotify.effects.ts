
import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {of} from 'rxjs';
import {catchError, map, mergeMap} from 'rxjs/operators';

import {SpotifyPlayerAPIService} from '../services/spotify-player-api.service';
import * as actions from './spotify.actions';

@Injectable()
export class SpotifyPlayerEffects {
  /**
   * Constructor.
   *
   * @param actions$ Actions Observer.
   * @param spotifyAPI Spotify API.
   */
  public constructor(
    private actions$: Actions,
    private spotifyAPI: SpotifyPlayerAPIService
  ) {}

  public pause$ = createEffect(
    () => this.actions$.pipe(
      ofType(actions.PAUSE),
      mergeMap(() => this.spotifyAPI.pause$().pipe(
        map(() => actions.noop()),
        catchError(() => of(actions.pauseErrorAction()))
      ))
    )
  );

  public play$ = createEffect(
    () => this.actions$.pipe(
      ofType(actions.PLAY),
      mergeMap(() => this.spotifyAPI.resume$().pipe(
        map(() => actions.noop()),
        catchError(() => of(actions.playErrorAction()))
      ))
    )
  );

  public currentTrack$ = createEffect(
    () => this.actions$.pipe(
      ofType(actions.CURRENT_TRACK_REQUEST),
      mergeMap(() => this.spotifyAPI.getCurrentPlayback$().pipe(
        map((response) => actions.currentTrackSuccess(response)),
        catchError(() => of(actions.currentTrackFailure()))
      ))
    )
  );
}
