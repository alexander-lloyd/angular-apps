import {Component, ChangeDetectionStrategy} from '@angular/core';
import {Store} from '@ngrx/store';

import {actions, SpotifyState} from './store';

@Component({
  selector: 'al-media-control',
  templateUrl: './media-control.component.html',
  styleUrls: ['./media-control.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MediaControlComponent {
  public constructor(
    private store: Store<{spotify: SpotifyState}>
  ) {}

  public pause(): void {
    this.store.dispatch(actions.pause());
  }

  public play(): void {
    this.store.dispatch(actions.play());
  }
}
