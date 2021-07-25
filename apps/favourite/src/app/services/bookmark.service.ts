import {Injectable} from '@angular/core';
import {from, Observable, of} from 'rxjs';
import {Bookmark, Tag} from '../models/bookmark.model';

/**
 * Bookmark Service. Currently supports Chrome.
 */
@Injectable()
export class BookmarkService {
  /**
   * Get all bookmarks.
   *
   * @returns Observable of all bookmarks.
   */
  public getBookmarks(): Observable<Bookmark[]> {
    return of([
      {
        id: '1',
        title: 'Google',
        url: 'https://google.com',
        tags: ['google', 'search']
      },
      {
        id: '2',
        title: 'Bing',
        url: 'https://bing.com',
        tags: ['microsoft', 'search']

      },
      {
        id: '3',
        title: 'Alexander Lloyd\'s Website',
        url: 'https://alexander-lloyd.dev/',
        tags: ['blog']
      },
    ]);
  }

  /**
   * Get a bookmark from Chrome
   *
   * @param {string} identifier Bookmark identifier.
   * @returns Bookmark.
   */
  public getBookmark(identifier: string): Observable<Bookmark> {
    const bookmark: Promise<Bookmark> = new Promise<chrome.bookmarks.BookmarkTreeNode>((resolve) => {
      chrome.bookmarks.get(identifier, (chromeBookmarks: chrome.bookmarks.BookmarkTreeNode[]) => resolve(chromeBookmarks[0]));
    }).then((chromeBookmark) => ({
      id: chromeBookmark.id,
      title: chromeBookmark.title,
      url: chromeBookmark.url || '',
      tags: []
    }));

    return from(bookmark);
  }

  /**
   * Get bookmarks from a tag.
   *
   * @param {Tag} tag Bookmark Tag.
   * @returns Array of bookmarks.
   */
  public getBookmarksByTag(tag: Tag): Observable<Bookmark[]> {
    return of([]);
  }
}
