import {Component, ChangeDetectionStrategy, OnInit} from '@angular/core';
import {Observable} from 'rxjs';

import {Bookmark} from './models/bookmark.model';
import {BookmarkService} from './services/bookmark.service';


/**
 * App Component.
 */
@Component({
  selector: 'al-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  public bookmarks$!: Observable<Bookmark[]>;

  /**
   * Constructor.
   *
   * @param bookmarkService Bookmark Service.
   */
  public constructor(
    private bookmarkService: BookmarkService
  ) {}

  public ngOnInit(): void {
    this.bookmarks$ = this.bookmarkService.getBookmarks();
  }
}
