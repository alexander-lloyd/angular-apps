import {Component, ChangeDetectionStrategy} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';

import {SpotifyState, actions, selectors} from './store';

@Component({
  selector: 'al-media-control',
  templateUrl: './media-control.component.html',
  styleUrls: ['./media-control.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MediaControlComponent {
  public isPlaying$: Observable<boolean>;

  public constructor(
    private readonly store: Store<{spotify: SpotifyState}>
  ) {
    this.isPlaying$ = this.store.select(selectors.isPlaying);
  }

  public pause(): void {
    this.store.dispatch(actions.pause());
  }

  public play(): void {
    this.store.dispatch(actions.play());
  }
}
