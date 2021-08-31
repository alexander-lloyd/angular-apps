import {Component, ViewEncapsulation, ChangeDetectionStrategy, Input} from '@angular/core';
import {Bookmark} from '../../models/bookmark.model';

/**
 * Bookmark Item Component.
 */
@Component({
  selector: 'al-bookmark-item',
  templateUrl: './bookmark-item.component.html',
  styleUrls: ['./bookmark-item.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookmarkItemComponent {
  @Input()
  public bookmark!: Bookmark;
}
