import {Component, ViewEncapsulation, ChangeDetectionStrategy} from '@angular/core';

@Component({
  selector: 'al-bookmark-search',
  templateUrl: './bookmark-search.component.html',
  styleUrls: ['./bookmark-search.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookmarkSearchComponent {
}
