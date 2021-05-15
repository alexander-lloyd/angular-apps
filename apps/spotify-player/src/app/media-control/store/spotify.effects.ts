
import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {of} from 'rxjs';
import {catchError, filter, map, mergeMap} from 'rxjs/operators';

import {SpotifyPlayerAPIService} from '../services/spotify-player-api.service';
import {CurrentlyPlayingObject} from '../services/types';
import * as actions from './spotify.actions';

/**
 * SpotifyPlayerEffects
 */
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

  public previous$ = createEffect(
    () => this.actions$.pipe(
      ofType(actions.PREVIOUS),
      mergeMap(() => this.spotifyAPI.previousTrack$().pipe(
        map(() => actions.noop()),
        catchError(() => of(actions.previousErrorAction()))
      ))
    )
  );

  public skip$ = createEffect(
    () => this.actions$.pipe(
      ofType(actions.SKIP),
      mergeMap(() => this.spotifyAPI.skipTrack$().pipe(
        map(() => actions.noop()),
        catchError(() => of(actions.skipErrorAction()))
      ))
    )
  );

  public currentTrack$ = createEffect(
    () => this.actions$.pipe(
      ofType(actions.CURRENT_TRACK_REQUEST),
      mergeMap(() => this.spotifyAPI.getCurrentPlayback$().pipe(
        filter((response) => response !== null),
        map((response) => actions.currentTrackSuccess(response as CurrentlyPlayingObject)),
        catchError(() => of(actions.currentTrackFailure()))
      ))
    )
  );
}
