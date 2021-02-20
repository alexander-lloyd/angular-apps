import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';

import {ReactiveStorage} from './types';

/**
 * Reactive Local Storage.
 */
export class ReactiveWebStorage implements ReactiveStorage<string | null> {
  private readonly subjects: Map<string, BehaviorSubject<string | null>>;
  private readonly _length: BehaviorSubject<number>;

  /**
   * Constructor.
   *
   * @param storage Storage object. Either window.localStorage or window.sessionStorage.
   */
  public constructor(private storage: Storage) {
    this.subjects = new Map();
    this._length = new BehaviorSubject(0);
  }

  /**
   * Return the number of items in storage.
   *
   * @returns Observable containing the number of items in storage.
   */
  public length(): Observable<number> {
    return this._length.asObservable();
  }

  /**
   * Get an item from storage.
   *
   * @param key Key.
   * @returns Observable that updates with new values.
   */
  public get(key: string): Observable<string | null> {
    let subject: BehaviorSubject<string | null> | undefined = this.subjects.get(key);

    if (subject === undefined) {
      subject = new BehaviorSubject<string | null>(this.storage.getItem(key));
      this._length.next(this._length.value + 1);
      this.subjects.set(key, subject);
    }

    return subject.asObservable();
  }

  /**
   * Does a key exist in storage?
   *
   * @param key Key.
   * @returns Observable. true if key exists.
   */
  public has(key: string): Observable<boolean> {
    return this.get(key).pipe(
      map((item) => item !== null)
    );
  }

  /**
   * Set a value in storage.
   *
   * @param key The key.
   * @param value The value.
   * @returns Observable.
   */
  public set(key: string, value: string): Observable<string | null> {
    let subject = this.subjects.get(key);
    this.storage.setItem(key, value);

    if (subject === undefined) {
      subject = new BehaviorSubject<string | null>(value);
      this.subjects.set(key, subject);
      this._length.next(this._length.value + 1);
    } else {
      subject.next(value);
    }

    return subject.asObservable();
  }

  /**
   * Remove a value from storage.
   *
   * @param key The key to remove.
   */
  public remove(key: string): void {
    const subject = this.subjects.get(key);
    if (subject !== undefined) {
      subject.next(null);
    }
    this.storage.removeItem(key);
    this._length.next(this._length.value - 1);
  }

  /**
   * Clear the storage.
   */
  public clear(): void {
    this.subjects.forEach((_, key) => {
      this.remove(key);
    });
    this.subjects.clear();
    this._length.next(0);
  }
}
