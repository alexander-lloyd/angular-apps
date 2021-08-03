import {Injectable} from '@angular/core';
import {from, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
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
    return from(new Promise<chrome.bookmarks.BookmarkTreeNode[]>((resolve) => {
      chrome.bookmarks.getTree((results) => resolve(results));
    })).pipe(
      map((value) => value.flatMap((node) => this.mapNodeToBookmark(node)))
    );
  }

  /**
   * Transform a chrome bookmark tree into a list of bookmarks.
   *
   * @param node Chrome bookmark node.
   * @returns List of bookmarks
   */
  private mapNodeToBookmark(node: chrome.bookmarks.BookmarkTreeNode): Bookmark[] {
    const bookmarks: Bookmark[] = [];

    if (node.url) {
      // If the node has a URL, then its a bookmark and not a Folder.
      bookmarks.push({
        id: node.id,
        title: node.title,
        url: node.url,
        tags: this.extractTags(node.url)
      });
    }

    if (node.children) {
      const children = node.children.flatMap((childNode) => this.mapNodeToBookmark(childNode));
      bookmarks.push(...children);
    }

    return bookmarks;
  }

  /**
   * Extract a tag from the chrome bookmark url.
   *
   * @param {string} url Url
   * @returns List of tags.
   */
  private extractTags(url: string): string[] {
    const urlTagEncoding = '~:tags=';
    const tagSeparator = ',';

    const parsedUrl = new URL(url);
    const {hash} = parsedUrl;

    const index = hash.indexOf(urlTagEncoding);
    if (index > -1) {
      const [, encodedGroups] = hash.split(urlTagEncoding);

      return decodeURI(encodedGroups).split(tagSeparator);
    }
    return [];
  }

  /**
   * Get a bookmark from Chrome
   *
   * @param {string} identifier Bookmark identifier.
   * @returns Bookmark.
   */
  public getBookmark(identifier: string): Observable<Bookmark> {
    const bookmark: Promise<Bookmark> = new Promise<chrome.bookmarks.BookmarkTreeNode>((resolve) => {
      chrome.bookmarks.get(identifier, (chromeBookmarks: chrome.bookmarks.BookmarkTreeNode[]) => {
        resolve(chromeBookmarks[0]);
      });
    }).then((chromeBookmark) => ({
      id: chromeBookmark.id,
      title: chromeBookmark.title,
      url: chromeBookmark.url || '',
      tags: this.extractTags(chromeBookmark.url || '')
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
    return this.getBookmarks()
      .pipe(
        map((bookmarks: Bookmark[]) => bookmarks.filter((bookmark) => bookmark.tags.find((value) => value === tag)))
      );
  }
}
