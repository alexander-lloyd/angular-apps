import {Component, ChangeDetectionStrategy} from '@angular/core';
import {
  faPause,
  faPlay,
  faStepBackward,
  faStepForward
} from '@fortawesome/free-solid-svg-icons';
import {Store} from '@ngrx/store';
import {Observable, combineLatest} from 'rxjs';
import {map} from 'rxjs/operators';

import {SpotifyState, actions, selectors} from './store';

@Component({
  selector: 'al-media-control',
  templateUrl: './media-control.component.html',
  styleUrls: ['./media-control.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MediaControlComponent {
  public faPause = faPause;
  public faPlay = faPlay;
  public faStepBackward = faStepBackward;
  public faStepForward = faStepForward;
  public isPlaying$: Observable<boolean>;
  public songProgress$: Observable<number>;

  public constructor(
    private readonly store: Store<{spotify: SpotifyState}>
  ) {
    this.isPlaying$ = this.store.select(selectors.isPlaying);
    this.songProgress$ = combineLatest(
      this.store.select(selectors.getSongProgress),
      this.store.select(selectors.getSongLength)
    ).pipe(
      map(([progress, total]: [number, number]) => (progress / total) * 100)
    );
  }

  public pause(): void {
    this.store.dispatch(actions.pause());
  }

  public play(): void {
    this.store.dispatch(actions.play());
  }

  public previousTrack(): void {
    this.store.dispatch(actions.previousAction());
  }

  public skipTrack(): void {
    this.store.dispatch(actions.skipAction());
  }
}
