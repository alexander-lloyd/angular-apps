import {Component, ChangeDetectionStrategy, Input, TrackByFunction} from '@angular/core';
import {Observable} from 'rxjs';
import {Bookmark} from '../../models/bookmark.model';
/**
 * Bookmark List Component.
 */
@Component({
  selector: 'al-bookmark-list',
  templateUrl: './bookmark-list.component.html',
  styleUrls: ['./bookmark-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookmarkListComponent {
  @Input()
  public bookmarks$!: Observable<Bookmark[]>;

  public trackByBookmarkId: TrackByFunction<Bookmark> = (index, item) => item.id;
}
