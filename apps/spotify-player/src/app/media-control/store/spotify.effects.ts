
import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {mergeMap} from 'rxjs/operators';


import {SpotifyPlayerAPIService} from '../services/spotify-player-api.service';
import {PAUSE, PLAY} from './spotify.actions';

@Injectable()
export class SpotifyPlayerEffects {
  public constructor(
    private actions$: Actions,
    private spotifyAPI: SpotifyPlayerAPIService
  ) {}

  @Effect({dispatch: false})
  public pause$ = this.actions$.pipe(
    ofType(PAUSE),
    mergeMap(() => this.spotifyAPI.pause$())
  );

  @Effect({dispatch: false})
  public play$ = this.actions$.pipe(
    ofType(PLAY),
    mergeMap(() => this.spotifyAPI.resume$())
  );
}
