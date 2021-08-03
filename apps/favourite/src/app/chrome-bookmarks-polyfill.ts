const bookmarks = [{
  id: '1',
  title: 'Google',
  children: [],
  dateAdded: 0,
  dateGroupModified: 0,
  index: 0,
  unmodifiable: false,
  url: 'https://www.google.co.uk#~:tags=Search%20Engine,Google'
}, {
  id: '2',
  title: 'Bing',
  children: [],
  dateAdded: 0,
  dateGroupModified: 0,
  index: 0,
  unmodifiable: false,
  url: 'https://www.bing.co.uk#~:tags=Search%20Engine,Microsoft'
}, {
  id: '3',
  title: 'Test',
  children: [],
  dateAdded: 0,
  dateGroupModified: 0,
  index: 0,
  unmodifiable: false,
  url: 'https://dfjsldkfjlskdjfdsssdfkdskfdls.com'
}];

/**
 * Polyfill Chrome Extension Bookmarks API for Dev purposes.
 */
export function polyfillChromeBookmarks(): void {
  if (!chrome?.bookmarks) {
    const chrome = {
      bookmarks: {
        getTree: (callback: (results: chrome.bookmarks.BookmarkTreeNode[]) => void): void => callback(bookmarks)
      }
    };

    Object.defineProperty(window, 'chrome', {
      value: chrome
    });
  }
}
