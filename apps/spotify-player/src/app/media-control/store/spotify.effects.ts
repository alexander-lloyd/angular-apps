
import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {of} from 'rxjs';
import {catchError, map, mergeMap} from 'rxjs/operators';

import {SpotifyPlayerAPIService} from '../services/spotify-player-api.service';
import {
  CURRENT_TRACK_REQUEST,
  PAUSE,
  PLAY,
  currentTrackFailure,
  currentTrackSuccess,
  pauseErrorAction,
  playErrorAction
} from './spotify.actions';


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
      ofType(PAUSE),
      mergeMap(() => this.spotifyAPI.pause$().pipe(
        catchError(() => of(pauseErrorAction()))
      ))
    )
  );

  public play$ = createEffect(
    () => this.actions$.pipe(
      ofType(PLAY),
      mergeMap(() => this.spotifyAPI.resume$().pipe(
        catchError(() => of(playErrorAction()))
      ))
    )
  );

  public currentTrack$ = createEffect(
    () => this.actions$.pipe(
      ofType(CURRENT_TRACK_REQUEST),
      mergeMap(() => this.spotifyAPI.getCurrentPlayback$().pipe(
        map((response) => currentTrackSuccess(response)),
        catchError(() => of(currentTrackFailure()))
      ))
    )
  );
}
