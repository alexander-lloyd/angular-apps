
import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {of} from 'rxjs';
import {catchError, mergeMap} from 'rxjs/operators';

import {SpotifyPlayerAPIService} from '../services/spotify-player-api.service';
import {PAUSE, PLAY, pauseErrorAction, playErrorAction} from './spotify.actions';


@Injectable()
export class SpotifyPlayerEffects {
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
}
