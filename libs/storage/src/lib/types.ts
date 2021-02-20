import {Observable} from 'rxjs';

/**
 * Storage Interface.
 */
export interface ReactiveStorage<T> {

  /**
   * Return the number of items in storage.
   *
   * @returns Observable containing the number of items in storage.
   */
  length(): Observable<number>;

  /**
   * Does a key exist in storage?
   *
   * @param key Key.
   * @returns Observable. true if key exists.
   */
  has(key: string): Observable<boolean>;

  /**
   * Get an item from storage.
   *
   * @param key Key.
   * @returns Observable that updates with new values. Returns Observable<undefined> if the item
   * does not exist.
   */
  get(key: string): Observable<T | null>;

  /**
   * Set a value in storage.
   *
   * @param key The key.
   * @param value The value.
   */
  set(key: string, value: T): Observable<T>;

  /**
   * Remove a value from storage.
   *
   * @param key The key to remove.
   */
  remove(key: string): void;

  /**
   * Clear storage.
   */
  clear(): void;
}
