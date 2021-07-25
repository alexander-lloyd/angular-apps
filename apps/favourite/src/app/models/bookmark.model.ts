/**
 * Represents a Tag.
 */
export type Tag = string;

/**
 * Bookmark.
 */
export interface Bookmark {
  /**
   * Unique identifier.
   */
  id: string;
  /**
   * Bookmark title.
   */
  title: string;
  /**
   * Bookmark Url.
   */
  url: string;
  /**
   * Bookmark Tags.
   */
  tags: Tag[]
}
