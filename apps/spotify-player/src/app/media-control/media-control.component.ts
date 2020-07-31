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

const PRECENTAGE = 100;

/**
 * MediaControlComponent.
 */
@Component({
  selector: 'al-media-control',
  templateUrl: 'media-control.component.html',
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
  public songLength$: Observable<number>;
  public songProgressPercent$: Observable<number>;

  /**
   * Constructor.
   *
   * @param store Application Store.
   */
  public constructor(
    private readonly store: Store<{spotify: SpotifyState}>
  ) {
    this.isPlaying$ = this.store.select(selectors.isPlaying);
    this.songProgress$ = this.store.select(selectors.getSongProgress);
    this.songLength$ = this.store.select(selectors.getSongLength);
    this.songProgressPercent$ = combineLatest(
      this.songProgress$,
      this.songLength$
    ).pipe(
      map(([progress, total]: [number, number]) => (progress / total) * PRECENTAGE)
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
